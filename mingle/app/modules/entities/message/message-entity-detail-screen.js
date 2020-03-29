import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { messageEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import MessageActions from './message.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './message-entity-detail-screen-style'

class MessageEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getMessage(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllMessages()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Message?',
      'Are you sure you want to delete the Message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteMessage(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.message) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.message.id}</Text>
        <Text testID="message">Message: {this.props.message.message}</Text>
        <Text testID="date">Date: {jsDateToLocalDate(this.props.message.date)}</Text>
        <RoundedButton text="Edit" onPress={messageEntityEditScreen.bind(this, { entityId: this.props.message.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.messages.message,
    deleting: state.messages.deleting,
    errorDeleting: state.messages.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessage: id => dispatch(MessageActions.messageRequest(id)),
    getAllMessages: options => dispatch(MessageActions.messageAllRequest(options)),
    deleteMessage: id => dispatch(MessageActions.messageDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageEntityDetailScreen)
