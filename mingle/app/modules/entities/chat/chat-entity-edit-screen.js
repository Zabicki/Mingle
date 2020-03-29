import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ChatActions from './chat.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { chatEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './chat-entity-edit-screen-style'

let Form = t.form.Form

class ChatEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        chats: t.list(this.getUsers()),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          userId: {
            testID: 'userIdInput',
            label: 'Chats',
          },
        },
      },
      chat: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getChat(props.data.entityId)
    }
    this.props.getAllUsers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chat !== prevState.chat && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.chat), chat: nextProps.chat }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllChats({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.chat.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: chatEntityDetailScreen.bind(this, { entityId }),
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
    const chat = this.form.getValue()
    if (chat) {
      // if validation fails, value will be null
      this.props.updateChat(formValueToEntity(chat))
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
    chats: [].concat(
      value.chats.map(chats => {
        return chats.id
      }),
    ),
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
  }
  entity.chats = [].concat(
    value.chats.map(chats => {
      return { id: chats }
    }),
  )
  return entity
}

const mapStateToProps = state => {
  return {
    users: state.users.users || [],
    chat: state.chats.chat,
    fetching: state.chats.fetchingOne,
    updating: state.chats.updating,
    error: state.chats.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getChat: id => dispatch(ChatActions.chatRequest(id)),
    getAllChats: options => dispatch(ChatActions.chatAllRequest(options)),
    updateChat: chat => dispatch(ChatActions.chatUpdateRequest(chat)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatEntityEditScreen)
