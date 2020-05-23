import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import EventActions from './event.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function* getEvent(api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.getEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(EventActions.eventSuccess(response.data))
  } else {
    yield put(EventActions.eventFailure(response.data))
  }
}

export function* getEvents(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getEvents, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventAllSuccess(response.data))
  } else {
    yield put(EventActions.eventAllFailure(response.data))
  }
}

export function* updateEvent(api, action) {
  const { event } = action
  // make the call to the api
  const idIsNotNull = !!event.id
  const apiCall = call(idIsNotNull ? api.updateEvent : api.createEvent, event)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(EventActions.eventUpdateSuccess(response.data))
  } else {
    yield put(EventActions.eventUpdateFailure(response.data))
  }
}

export function* deleteEvent(api, action) {
  const { eventId } = action
  // make the call to the api
  const apiCall = call(api.deleteEvent, eventId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EventActions.eventDeleteSuccess())
  } else {
    yield put(EventActions.eventDeleteFailure(response.data))
  }
}

export function* acceptEvent(api,action){
  const { eventId }  = action

  const apiCall = call(api.acceptEvent,eventId)
  const response = yield call(callApi,apiCall)

  //success?
  if(response.ok){
    yield put(EventActions.eventAcceptSuccess(response.data))
  } else{
    yield put(EventActions.eventAcceptFailure(response.data))
  }

}

export function* getNearby(api,action){
  const { options, latitude, longitude, radius }  = action

  const apiCall = call(api.getNearby, [options, latitude, longitude, radius])
  const response = yield call(callApi,apiCall)

  //success?
  if(response.ok){
    yield put(EventActions.eventAllNearbySuccess(response.data))
  } else{
    yield put(EventActions.eventAllNearbyFailure(response.data))
  }
}

export function* getFromCity(api,action){
  const { options, city }  = action

  const apiCall = call(api.getFromCity, [options, city])
  const response = yield call(callApi,apiCall)

  //success?
  if(response.ok){
    yield put(EventActions.eventAllFromCitySuccess(response.data))
  } else{
    yield put(EventActions.eventAllFromCityFailure(response.data))
  }
}

export function* getHosted(api,action){
  const { options }  = action

  const apiCall = call(api.getHosted, options)
  const response = yield call(callApi,apiCall)

  //success?
  if(response.ok){
    yield put(EventActions.eventAllHostedSuccess(response.data))
  } else{
    yield put(EventActions.eventAllHostedFailure(response.data))
  }
}

export function* getAccepted(api,action){
  const { options }  = action

  const apiCall = call(api.getAccepted, options)
  const response = yield call(callApi,apiCall)

  //success?
  if(response.ok){
    yield put(EventActions.eventAllAcceptedSuccess(response.data))
  } else{
    yield put(EventActions.eventAllAcceptedFailure(response.data))
  }
}

function mapDateFields(data) {
  if (data.date) {
    data.date = localDateToJsDate(data.date)
  }
  return data
}
