import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import MessageActions from './message.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import ChatActions from '../chat/chat.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { messageEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './message-entity-edit-screen-style'

let Form = t.form.Form

class MessageEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        message: t.maybe(t.String),
        date: t.maybe(t.Date),
        userId: this.getUsers(),
        chatId: this.getChats(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          userId: {
            testID: 'userIdInput',
            label: 'Message',
          },
          chatId: {
            testID: 'chatIdInput',
            label: 'Messages',
          },
          message: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('date').refs.input.focus(),
            testID: 'messageInput',
          },
          date: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date),
            },
            testID: 'dateInput',
          },
        },
      },
      message: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getMessage(props.data.entityId)
    }
    this.props.getAllUsers()
    this.props.getAllChats()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message !== prevState.message && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.message), message: nextProps.message }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllMessages({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.message.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: messageEntityDetailScreen.bind(this, { entityId }),
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
  getChats = () => {
    const chats = {}
    this.props.chats.forEach(chat => {
      chats[chat.id] = chat.id ? chat.id.toString() : chat.id.toString()
    })
    return t.maybe(t.enums(chats))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const message = this.form.getValue()
    if (message) {
      // if validation fails, value will be null
      this.props.updateMessage(formValueToEntity(message))
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
    message: value.message || null,
    date: value.date || null,
    userId: value.user && value.user.id ? value.user.id : null,
    chatId: value.chat && value.chat.id ? value.chat.id : null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    message: value.message || null,
    date: value.date || null,
  }
  if (value.userId) {
    entity.user = { id: value.userId }
  }
  if (value.chatId) {
    entity.chat = { id: value.chatId }
  }
  return entity
}

const mapStateToProps = state => {
  return {
    users: state.users.users || [],
    chats: state.chats.chats || [],
    message: state.messages.message,
    fetching: state.messages.fetchingOne,
    updating: state.messages.updating,
    error: state.messages.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getAllChats: options => dispatch(ChatActions.chatAllRequest(options)),
    getMessage: id => dispatch(MessageActions.messageRequest(id)),
    getAllMessages: options => dispatch(MessageActions.messageAllRequest(options)),
    updateMessage: message => dispatch(MessageActions.messageUpdateRequest(message)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageEntityEditScreen)
