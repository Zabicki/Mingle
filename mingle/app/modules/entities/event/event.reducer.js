import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventRequest: ['eventId'],
  eventAllRequest: ['options'],
  eventUpdateRequest: ['event'],
  eventDeleteRequest: ['eventId'],
  eventAcceptRequest: ['eventId'],
  eventAllNearbyRequest: ['options','latitude','longitude','radius'],
  eventAllFromCityRequest: ['options','city'],
  eventAllHostedRequest: ['options'],
  eventAllAcceptedRequest: ['options'],

  eventSuccess: ['event'],
  eventAllSuccess: ['events'],
  eventUpdateSuccess: ['event'],
  eventDeleteSuccess: [],
  eventAcceptSuccess: ['event'],
  eventAllNearbySuccess: ['events'],
  eventAllFromCitySuccess: ['events'],
  eventAllHostedSuccess: ['events'],
  eventAllAcceptedSuccess: ['events'],

  eventFailure: ['error'],
  eventAllFailure: ['error'],
  eventUpdateFailure: ['error'],
  eventDeleteFailure: ['error'],
  eventAcceptFailure: ['error'],
  eventAllNearbyFailure: ['error'],
  eventAllFromCityFailure: ['error'],
  eventAllHostedFailure: ['error'],
  eventAllAcceptedFailure: ['error'],


  eventSetMaybe: ['events'],
})

export const EventTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  event: null,
  events: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  maybeEvents: [],
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    event: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    events: [],
  })

// request to update from an api
export const updateRequest = state =>
  state.merge({
    updating: true,
  })
// request to delete from an api
export const deleteRequest = state =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { event } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    event,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { events } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    events,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { event } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    event,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    event: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    event: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    events: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    event: state.event,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    event: state.event,
  })
}

export const setMaybe = (state,action) =>{
  const {events} = action
  return state.merge({
    maybeEvents: events,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_REQUEST]: request,
  [Types.EVENT_ALL_REQUEST]: allRequest,
  [Types.EVENT_UPDATE_REQUEST]: updateRequest,
  [Types.EVENT_DELETE_REQUEST]: deleteRequest,
  [Types.EVENT_ACCEPT_REQUEST]: updateRequest,
  [Types.EVENT_ALL_NEARBY_REQUEST]: allRequest,
  [Types.EVENT_ALL_FROM_CITY_REQUEST]: allRequest,
  [Types.EVENT_ALL_HOSTED_REQUEST]: allRequest,
  [Types.EVENT_ALL_ACCEPTED_REQUEST]: allRequest,

  [Types.EVENT_SUCCESS]: success,
  [Types.EVENT_ALL_SUCCESS]: allSuccess,
  [Types.EVENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.EVENT_DELETE_SUCCESS]: deleteSuccess,
  [Types.EVENT_ACCEPT_SUCCESS]: updateSuccess,
  [Types.EVENT_ALL_NEARBY_SUCCESS]: allSuccess,
  [Types.EVENT_ALL_FROM_CITY_SUCCESS]: allSuccess,
  [Types.EVENT_ALL_HOSTED_SUCCESS]: allSuccess,
  [Types.EVENT_ALL_ACCEPTED_SUCCESS]: allSuccess,

  [Types.EVENT_FAILURE]: failure,
  [Types.EVENT_ALL_FAILURE]: allFailure,
  [Types.EVENT_UPDATE_FAILURE]: updateFailure,
  [Types.EVENT_DELETE_FAILURE]: deleteFailure,
  [Types.EVENT_ACCEPT_FAILURE]: updateFailure,
  [Types.EVENT_ALL_NEARBY_FAILURE]: allFailure,
  [Types.EVENT_ALL_FROM_CITY_FAILURE]: allFailure,
  [Types.EVENT_ALL_HOSTED_FAILURE]: allFailure,
  [Types.EVENT_ALL_ACCEPTED_FAILURE]: allFailure,

  [Types.EVENT_SET_MAYBE]: setMaybe,
})
