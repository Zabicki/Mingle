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

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderTopWidth = 0;
stylesheet.textbox.error.borderTopWidth = 0;
stylesheet.textbox.normal.borderLeftWidth = 0;
stylesheet.textbox.error.borderLeftWidth = 0;
stylesheet.textbox.normal.borderRightWidth = 0;
stylesheet.textbox.error.borderRightWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.fontSize = 16;
stylesheet.textbox.error.fontSize = 16;

stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;
stylesheet.textboxView.normal.marginTop = 8;
stylesheet.textboxView.error.marginTop = 8;

stylesheet.dateValue.normal.borderColor = 'grey';
stylesheet.dateValue.normal.color = 'grey';
stylesheet.dateValue.normal.borderBottomWidth = 1;
stylesheet.dateValue.normal.borderLeftWidth = 0;
stylesheet.dateValue.normal.borderRightWidth = 0;
stylesheet.dateValue.normal.borderTopWidth = 0;

stylesheet.controlLabel.normal.color = 'grey';

const Category = t.enums({
  SPORT: 'SPORT',
  FOOD: 'FOOD',
  MUSIC: 'MUSIC',
  PARTY: 'PARTY',
  EDUCATION: 'EDUCATION',
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
        name: t.String,
        description: t.String,
        picture: t.maybe(t.String),
        city: t.String,
        address: t.String,
        maxParticipants: t.maybe(t.Number),
        location: t.struct({
          latitude: t.Number,
          longitude: t.Number,
        }),
        date: t.Date,
        recurrent: t.Boolean,
        interval: t.maybe(t.Number),
        category: Category,
        privacy: Privacy,
      }),
      formOptions: {
        
        fields: {
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
            onSubmitEditing: () => this.form.getComponent('maxParticipants').refs.input.focus(),
            testID: 'addressInput',
          },
          maxParticipants: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('location').refs.input.focus(),
            testID: 'maxParticipantsInput',
          },
          location: {
            auto: 'placeholders',
            label: 'Location',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('date').refs.input.focus(),
            testID: 'locationInput',
          },
          date: {
            normal: {
              color: '#EDEDED',
              fontSize: 16,
              padding: 7,
              marginBottom: 5,
              marginTop: 20,
            },
            mode: 'date',
            dialogMode: 'calendar',
            error: 'Enter date',
            returnKeyType: 'next',
            config: {
              defaultValueText: 'Tap to pick date', // Allows you to format the PlaceHolders !!
              format: date => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('recurrent').refs.input.focus(),
            testID: 'dateInput',
          },
          recurrent: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('interval').refs.input.focus(),
            testID: 'recurrentInput',
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
        stylesheet: stylesheet,
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
    name: value.name || null,
    description: value.description || null,
    picture: value.picture || null,
    city: value.city || null,
    address: value.address || null,
    maxParticipants: value.maxParticipants || null,
    location: {
      latitude: value.location[0],
      longitude: value.location[1],
    },
    date: value.date || null,
    recurrent: value.recurrent || null,
    interval: value.interval || null,
    category: value.category || null,
    privacy: value.privacy || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    name: value.name || null,
    description: value.description || null,
    picture: value.picture || null,
    city: value.city || null,
    address: value.address || null,
    maxParticipants: value.maxParticipants || null,
    location: [value.location.latitude, value.location.longitude],
    date: value.date || null,
    recurrent: value.recurrent || false,
    interval: value.interval || null,
    category: value.category || null,
    privacy: value.privacy || null,
  }
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
