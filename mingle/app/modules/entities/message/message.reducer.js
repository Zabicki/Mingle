import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  messageRequest: ['messageId'],
  messageAllRequest: ['options'],
  messageUpdateRequest: ['message'],
  messageDeleteRequest: ['messageId'],

  messageSuccess: ['message'],
  messageAllSuccess: ['messages'],
  messageUpdateSuccess: ['message'],
  messageDeleteSuccess: [],

  messageFailure: ['error'],
  messageAllFailure: ['error'],
  messageUpdateFailure: ['error'],
  messageDeleteFailure: ['error'],
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  message: null,
  messages: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    message: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    messages: [],
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
  const { message } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    message,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { messages } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    messages,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { message } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    message,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    message: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    message: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    messages: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    message: state.message,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    message: state.message,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGE_REQUEST]: request,
  [Types.MESSAGE_ALL_REQUEST]: allRequest,
  [Types.MESSAGE_UPDATE_REQUEST]: updateRequest,
  [Types.MESSAGE_DELETE_REQUEST]: deleteRequest,

  [Types.MESSAGE_SUCCESS]: success,
  [Types.MESSAGE_ALL_SUCCESS]: allSuccess,
  [Types.MESSAGE_UPDATE_SUCCESS]: updateSuccess,
  [Types.MESSAGE_DELETE_SUCCESS]: deleteSuccess,

  [Types.MESSAGE_FAILURE]: failure,
  [Types.MESSAGE_ALL_FAILURE]: allFailure,
  [Types.MESSAGE_UPDATE_FAILURE]: updateFailure,
  [Types.MESSAGE_DELETE_FAILURE]: deleteFailure,
})
