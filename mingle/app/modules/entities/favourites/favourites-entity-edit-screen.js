import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import FavouriteActions from './favourites.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { favouriteEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './favourites-entity-edit-screen-style'

let Form = t.form.Form
const Category = t.enums({
  SPORT: 'SPORT',
  FOOD: 'FOOD',
  MUSIC: 'MUSIC',
  PARTY: 'PARTY',
  OTHER: 'OTHER',
})

class FavouriteEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        favourite: t.maybe(Category),
        userId: this.getUsers(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          userId: {
            testID: 'userIdInput',
            label: 'Favourites',
          },
          favourite: {
            testID: 'favouriteInput',
          },
        },
      },
      favourite: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getFavourite(props.data.entityId)
    }
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.favourite !== prevState.favourite && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.favourite), favourite: nextProps.favourite }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllFavourites({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.favourite.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: favouriteEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getUsers = () => {
    const users = {}
    this.props.users.forEach(user => {
      users[user.id] = user.id ? user.id.toString() : user.id.toString()
    })
    return t.maybe(t.enums(users))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const favourite = this.form.getValue()
    if (favourite) {
      // if validation fails, value will be null
      this.props.updateFavourite(formValueToEntity(favourite))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID="entityScrollView">
          <Form
            ref={c => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = value => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    favourite: value.favourite || null,
    userId: value.user && value.user.id ? value.user.id : null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    favourite: value.favourite || null,
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  return entity
}

const mapStateToProps = state => {
  return {
    users: state.users.users || [],
    favourite: state.favourites.favourite,
    fetching: state.favourites.fetchingOne,
    updating: state.favourites.updating,
    error: state.favourites.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getFavourite: id => dispatch(FavouriteActions.favouriteRequest(id)),
    getAllFavourites: options => dispatch(FavouriteActions.favouriteAllRequest(options)),
    updateFavourite: favourite => dispatch(FavouriteActions.favouriteUpdateRequest(favourite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteEntityEditScreen)
