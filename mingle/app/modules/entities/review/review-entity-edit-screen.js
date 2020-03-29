import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ReviewActions from './review.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { reviewEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './review-entity-edit-screen-style'

let Form = t.form.Form

class ReviewEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        score: t.Number,
        review: t.maybe(t.String),
        userId: this.getUsers(),
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
            label: 'Reviews',
          },
          userId: {
            testID: 'userIdInput',
            label: 'Review',
          },
          score: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('review').refs.input.focus(),
            testID: 'scoreInput',
          },
          review: {
            testID: 'reviewInput',
          },
        },
      },
      review: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getReview(props.data.entityId)
    }
    this.props.getAllUsers()
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.review !== prevState.review && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.review), review: nextProps.review }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllReviews({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.review.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: reviewEntityDetailScreen.bind(this, { entityId }),
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
  getUsers = () => {
    const users = {}
    this.props.users.forEach(user => {
      users[user.id] = user.id ? user.id.toString() : user.id.toString()
    })
    return t.maybe(t.enums(users))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const review = this.form.getValue()
    if (review) {
      // if validation fails, value will be null
      this.props.updateReview(formValueToEntity(review))
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
    score: value.score || null,
    review: value.review || null,
    userId: value.user && value.user.id ? value.user.id : null,
    userId: value.user && value.user.id ? value.user.id : null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    score: value.score || null,
    review: value.review || null,
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  return entity
}

const mapStateToProps = state => {
  return {
    users: state.users.users || [],
    review: state.reviews.review,
    fetching: state.reviews.fetchingOne,
    updating: state.reviews.updating,
    error: state.reviews.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getReview: id => dispatch(ReviewActions.reviewRequest(id)),
    getAllReviews: options => dispatch(ReviewActions.reviewAllRequest(options)),
    updateReview: review => dispatch(ReviewActions.reviewUpdateRequest(review)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewEntityEditScreen)
