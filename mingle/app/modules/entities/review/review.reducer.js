import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reviewRequest: ['reviewId'],
  reviewAllRequest: ['options'],
  reviewUpdateRequest: ['review'],
  reviewDeleteRequest: ['reviewId'],

  reviewSuccess: ['review'],
  reviewAllSuccess: ['reviews'],
  reviewUpdateSuccess: ['review'],
  reviewDeleteSuccess: [],

  reviewFailure: ['error'],
  reviewAllFailure: ['error'],
  reviewUpdateFailure: ['error'],
  reviewDeleteFailure: ['error'],
})

export const ReviewTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  review: null,
  reviews: [],
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
    review: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    reviews: [],
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
  const { review } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    review,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { reviews } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    reviews,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { review } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    review,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    review: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    review: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    reviews: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    review: state.review,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    review: state.review,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REVIEW_REQUEST]: request,
  [Types.REVIEW_ALL_REQUEST]: allRequest,
  [Types.REVIEW_UPDATE_REQUEST]: updateRequest,
  [Types.REVIEW_DELETE_REQUEST]: deleteRequest,

  [Types.REVIEW_SUCCESS]: success,
  [Types.REVIEW_ALL_SUCCESS]: allSuccess,
  [Types.REVIEW_UPDATE_SUCCESS]: updateSuccess,
  [Types.REVIEW_DELETE_SUCCESS]: deleteSuccess,

  [Types.REVIEW_FAILURE]: failure,
  [Types.REVIEW_ALL_FAILURE]: allFailure,
  [Types.REVIEW_UPDATE_FAILURE]: updateFailure,
  [Types.REVIEW_DELETE_FAILURE]: deleteFailure,
})
