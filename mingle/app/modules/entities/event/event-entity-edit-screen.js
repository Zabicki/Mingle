import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from './event.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { eventEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './event-entity-edit-screen-style'

let Form = t.form.Form
const Category = t.enums({
  SPORT: 'SPORT',
  FOOD: 'FOOD',
  MUSIC: 'MUSIC',
  PARTY: 'PARTY',
  OTHER: 'OTHER',
})
const Privacy = t.enums({
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
})

class EventEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.String,
        description: t.String,
        picture: t.maybe(t.String),
        city: t.String,
        address: t.String,
        maxParticpants: t.maybe(t.Number),
        date: t.Date,
        recurent: t.Boolean,
        interval: t.maybe(t.Number),
        category: Category,
        privacy: Privacy,
        userId: this.getUsers(),
        events: t.list(this.getUsers()),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          userId: {
            testID: 'userIdInput',
            label: 'Event',
          },
          userId: {
            testID: 'userIdInput',
            label: 'Events',
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'nameInput',
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('picture').refs.input.focus(),
            testID: 'descriptionInput',
          },
          picture: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('city').refs.input.focus(),
            testID: 'pictureInput',
          },
          city: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('address').refs.input.focus(),
            testID: 'cityInput',
          },
          address: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('maxParticpants').refs.input.focus(),
            testID: 'addressInput',
          },
          maxParticpants: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('date').refs.input.focus(),
            testID: 'maxParticpantsInput',
          },
          date: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('recurent').refs.input.focus(),
            testID: 'dateInput',
          },
          recurent: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('interval').refs.input.focus(),
            testID: 'recurentInput',
          },
          interval: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('category').refs.input.focus(),
            testID: 'intervalInput',
          },
          category: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('privacy').refs.input.focus(),
            testID: 'categoryInput',
          },
          privacy: {
            testID: 'privacyInput',
          },
        },
      },
      event: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getEvent(props.data.entityId)
    }
    this.props.getAllUsers()
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.event !== prevState.event && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.event), event: nextProps.event }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllEvents({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.event.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: eventEntityDetailScreen.bind(this, { entityId }),
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
    const event = this.form.getValue()
    if (event) {
      // if validation fails, value will be null
      this.props.updateEvent(formValueToEntity(event))
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
    name: value.name || null,
    description: value.description || null,
    picture: value.picture || null,
    city: value.city || null,
    address: value.address || null,
    maxParticpants: value.maxParticpants || null,
    date: value.date || null,
    recurent: value.recurent || null,
    interval: value.interval || null,
    category: value.category || null,
    privacy: value.privacy || null,
    userId: value.user && value.user.id ? value.user.id : null,
    events: [].concat(
      value.events.map(events => {
        return events.id
      }),
    ),
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    name: value.name || null,
    description: value.description || null,
    picture: value.picture || null,
    city: value.city || null,
    address: value.address || null,
    maxParticpants: value.maxParticpants || null,
    date: value.date || null,
    recurent: value.recurent || null,
    interval: value.interval || null,
    category: value.category || null,
    privacy: value.privacy || null,
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  entity.events = [].concat(
    value.events.map(events => {
      return { id: events }
    }),
  )
  return entity
}

const mapStateToProps = state => {
  return {
    users: state.users.users || [],
    event: state.events.event,
    fetching: state.events.fetchingOne,
    updating: state.events.updating,
    error: state.events.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getEvent: id => dispatch(EventActions.eventRequest(id)),
    getAllEvents: options => dispatch(EventActions.eventAllRequest(options)),
    updateEvent: event => dispatch(EventActions.eventUpdateRequest(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventEntityEditScreen)
