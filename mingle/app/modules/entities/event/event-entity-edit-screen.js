import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import EventActions from './event.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { eventEntityDetailScreen, mapPicker } from '../../../navigation/layouts'

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

class EventEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        name: t.String,
        description: t.String,
        maxParticipants: t.maybe(t.Number),
        date: t.Date,
        category: Category,
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
            onSubmitEditing: () => this.form.getComponent('maxParticipants').refs.input.focus(),
            testID: 'descriptionInput',
          },
          maxParticipants: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('date').refs.input.focus(),
            testID: 'maxParticipantsInput',
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
            onSubmitEditing: () => this.form.getComponent('category').refs.input.focus(),
            testID: 'dateInput',
          },
          category: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('name').refs.input.focus(),
            testID: 'categoryInput',
          },
        },
        stylesheet: stylesheet,
      },
      location: null,
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
      const res = entityToFormValue(nextProps.event)
      const newForm = {
        name: res.name,
        description: res.description,
        maxParticipants: res.maxParticipants,
        date: res.date,
        category: res.category,
      }
      return { formValue: newForm, event: nextProps.event,
       location: {
          address: res.address,
          latitude: res.location.latitude,
          longitude: res.location.longitude,
          city: res.city,
       }
      }
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
        Alert.alert('Success', 'Event created successfully', alertOptions)
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
      this.props.updateEvent(formValueToEntity(event, this.state.location))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  processLocation = (geoArray) =>{
    const {locality, position, formattedAddress} = geoArray;
    this.setState({
      location: {
        address: formattedAddress,
        latitude: position.lat,
        longitude: position.lng,
        city: locality,
      }
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
          <View>
            <Text>Address: {this.state.location ? this.state.location.address : "not set"}</Text>
            <Text>City: {this.state.location ? this.state.location.city : "not set"}</Text>
            <Text>Latitude: {this.state.location ? this.state.location.latitude : "not set"}</Text>
            <Text>Longitude: {this.state.location ? this.state.location.longitude : "not set"}</Text>
          </View>
          <TouchableHighlight style={styles.button} onPress={mapPicker.bind(this, {onSave: this.processLocation.bind(this)})} underlayColor="#99d9f4" testID="submitButton">
             <Text style={styles.buttonText}>Pick location</Text>
          </TouchableHighlight>
          { this.state.location && (
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          )}
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
    city: value.city || null,
    address: value.address || null,
    maxParticipants: value.maxParticipants || null,
    location: {
      latitude: value.location[1],
      longitude: value.location[0],
    },
    date: value.date || null,
    category: value.category || null,
  }
}
const formValueToEntity = (value,location) => {
  const entity = {
    name: value.name || null,
    description: value.description || null,
    city: location.city,
    address: location.address,
    maxParticipants: value.maxParticipants || null,
    location: [location.longitude, location.latitude],
    date: value.date || null,
    category: value.category || null,
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
