import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ChatActions from './chat.reducer'

export function* getChat(api, action) {
  const { chatId } = action
  // make the call to the api
  const apiCall = call(api.getChat, chatId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ChatActions.chatSuccess(response.data))
  } else {
    yield put(ChatActions.chatFailure(response.data))
  }
}

export function* getChats(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getChats, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ChatActions.chatAllSuccess(response.data))
  } else {
    yield put(ChatActions.chatAllFailure(response.data))
  }
}

export function* updateChat(api, action) {
  const { chat } = action
  // make the call to the api
  const idIsNotNull = !!chat.id
  const apiCall = call(idIsNotNull ? api.updateChat : api.createChat, chat)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ChatActions.chatUpdateSuccess(response.data))
  } else {
    yield put(ChatActions.chatUpdateFailure(response.data))
  }
}

export function* deleteChat(api, action) {
  const { chatId } = action
  // make the call to the api
  const apiCall = call(api.deleteChat, chatId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ChatActions.chatDeleteSuccess())
  } else {
    yield put(ChatActions.chatDeleteFailure(response.data))
  }
}
