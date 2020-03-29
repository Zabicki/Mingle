import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import MessageActions from './message.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function* getMessage(api, action) {
  const { messageId } = action
  // make the call to the api
  const apiCall = call(api.getMessage, messageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(MessageActions.messageSuccess(response.data))
  } else {
    yield put(MessageActions.messageFailure(response.data))
  }
}

export function* getMessages(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getMessages, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(MessageActions.messageAllSuccess(response.data))
  } else {
    yield put(MessageActions.messageAllFailure(response.data))
  }
}

export function* updateMessage(api, action) {
  const { message } = action
  // make the call to the api
  const idIsNotNull = !!message.id
  const apiCall = call(idIsNotNull ? api.updateMessage : api.createMessage, message)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(MessageActions.messageUpdateSuccess(response.data))
  } else {
    yield put(MessageActions.messageUpdateFailure(response.data))
  }
}

export function* deleteMessage(api, action) {
  const { messageId } = action
  // make the call to the api
  const apiCall = call(api.deleteMessage, messageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(MessageActions.messageDeleteSuccess())
  } else {
    yield put(MessageActions.messageDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.date) {
    data.date = localDateToJsDate(data.date)
  }
  return data
}
