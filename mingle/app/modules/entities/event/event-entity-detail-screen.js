import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { eventEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import EventActions from './event.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './event-entity-detail-screen-style'

class EventEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getEvent(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllEvents()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Event?',
      'Are you sure you want to delete the Event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteEvent(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.event) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.event.id}</Text>
        <Text testID="name">Name: {this.props.event.name}</Text>
        <Text testID="description">Description: {this.props.event.description}</Text>
        <Text testID="picture">Picture: {this.props.event.picture}</Text>
        <Text testID="city">City: {this.props.event.city}</Text>
        <Text testID="address">Address: {this.props.event.address}</Text>
        <Text testID="maxParticpants">MaxParticpants: {this.props.event.maxParticpants}</Text>
        <Text testID="date">Date: {jsDateToLocalDate(this.props.event.date)}</Text>
        <Text testID="recurent">Recurent: {this.props.event.recurent}</Text>
        <Text testID="interval">Interval: {this.props.event.interval}</Text>
        <Text testID="category">Category: {this.props.event.category}</Text>
        <Text testID="privacy">Privacy: {this.props.event.privacy}</Text>
        <RoundedButton text="Edit" onPress={eventEntityEditScreen.bind(this, { entityId: this.props.event.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    event: state.events.event,
    deleting: state.events.deleting,
    errorDeleting: state.events.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvent: id => dispatch(EventActions.eventRequest(id)),
    getAllEvents: options => dispatch(EventActions.eventAllRequest(options)),
    deleteEvent: id => dispatch(EventActions.eventDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventEntityDetailScreen)
