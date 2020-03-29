import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { chatEntityEditScreen } from '../../../navigation/layouts'

import ChatActions from './chat.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './chat-entity-detail-screen-style'

class ChatEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getChat(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllChats()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Chat?',
      'Are you sure you want to delete the Chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteChat(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.chat) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.chat.id}</Text>
        <RoundedButton text="Edit" onPress={chatEntityEditScreen.bind(this, { entityId: this.props.chat.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    chat: state.chats.chat,
    deleting: state.chats.deleting,
    errorDeleting: state.chats.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChat: id => dispatch(ChatActions.chatRequest(id)),
    getAllChats: options => dispatch(ChatActions.chatAllRequest(options)),
    deleteChat: id => dispatch(ChatActions.chatDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatEntityDetailScreen)
