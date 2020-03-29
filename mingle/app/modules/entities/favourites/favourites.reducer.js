import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  favouriteRequest: ['favouriteId'],
  favouriteAllRequest: ['options'],
  favouriteUpdateRequest: ['favourite'],
  favouriteDeleteRequest: ['favouriteId'],

  favouriteSuccess: ['favourite'],
  favouriteAllSuccess: ['favourites'],
  favouriteUpdateSuccess: ['favourite'],
  favouriteDeleteSuccess: [],

  favouriteFailure: ['error'],
  favouriteAllFailure: ['error'],
  favouriteUpdateFailure: ['error'],
  favouriteDeleteFailure: ['error'],
})

export const FavouriteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  favourite: null,
  favourites: [],
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
    favourite: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    favourites: [],
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
  const { favourite } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    favourite,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { favourites } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    favourites,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { favourite } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    favourite,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    favourite: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    favourite: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    favourites: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    favourite: state.favourite,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    favourite: state.favourite,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FAVOURITE_REQUEST]: request,
  [Types.FAVOURITE_ALL_REQUEST]: allRequest,
  [Types.FAVOURITE_UPDATE_REQUEST]: updateRequest,
  [Types.FAVOURITE_DELETE_REQUEST]: deleteRequest,

  [Types.FAVOURITE_SUCCESS]: success,
  [Types.FAVOURITE_ALL_SUCCESS]: allSuccess,
  [Types.FAVOURITE_UPDATE_SUCCESS]: updateSuccess,
  [Types.FAVOURITE_DELETE_SUCCESS]: deleteSuccess,

  [Types.FAVOURITE_FAILURE]: failure,
  [Types.FAVOURITE_ALL_FAILURE]: allFailure,
  [Types.FAVOURITE_UPDATE_FAILURE]: updateFailure,
  [Types.FAVOURITE_DELETE_FAILURE]: deleteFailure,
})
