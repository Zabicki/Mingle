import React from 'react'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import ChatActions from './chat.reducer'

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { GiftedChat } from 'react-native-gifted-chat';

if (typeof TextEncoder !== 'function') {
    const TextEncodingPolyfill = require('text-encoding')
    TextEncoder = TextEncodingPolyfill.TextEncoder
    TextDecoder = TextEncodingPolyfill.TextDecoder
}

var client = null;
class ChatEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      page: 0,
      sort: 'createdAt,desc',
      size: 20,
      channelConnected: false,
    };
    this.props.getInitChat(this.props.data.entityId, { page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  componentDidMount(){
    const url = "http://localhost:8080/websocket/chat";
    client = new Client({
    brokerURL: url,
    connectHeaders: this.customHeaders,
    webSocketFactory: () => {
      return SockJS(url);
    },
    onConnect: (frame) => {
      this.setState({
        channelConnected: true,
      });

      client.subscribe("/topic/chat/" + this.props.data.entityId , this.onMessageReceived);
    },
    });
    client.activate();
  }

  componentWillUnMount(){
    client.deactivate();
    this.props.clearMessages();
  }

  sendMessage = (message) => {
    const jsonMessage = {
    "text": message.text,
     };
    if(this.state.channelConnected){
      client.publish({destination: "/topic/send/"+ this.props.data.entityId, body: JSON.stringify(jsonMessage)})
    }
  }

   onMessageReceived = (payload) => {
     var message = JSON.parse(payload.body);
     this.props.newMessage(message);
   }


  loadMOAR = () => {
    if(this.props.done || this.props.fetching ){
      return
    }
    this.setState((state)=>{
      const newPage = state.page +1;
      return {
        page: newPage,
      };
    },
    () => this.fetchMessages());
  }

  fetchMessages = () =>{
    this.props.getChat(this.props.data.entityId, { page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  customHeaders = {
    "Authorization": "Bearer " + this.props.token,
  };


  render() {
    const tok = jwt_decode(this.props.token);
    return (
      <GiftedChat
        messages = {this.props.messages}
        onSend = { message => this.sendMessage(message[0]) }
        //Todo add logged user login here
        user = {{login: tok.sub}}
        loadEarlier = {!this.props.done}
        onLoadEarlier = {this.loadMOAR}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.authToken,
    messages: state.chats.messages,
    fetching: state.chats.fetchingOne,
    done: state.chats.done,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChat: (chatId, options) => dispatch(ChatActions.chatMessagesRequest(chatId,options)),
    getInitChat: (chatId, options) => dispatch(ChatActions.chatInitMessagesRequest(chatId, options)),
    newMessage: (message) => dispatch(ChatActions.chatNewMessage(message)),
    clearMessages: () => dispatch(ChatActions.clearMessages()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatEntityDetailScreen)
