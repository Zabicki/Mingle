import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ReviewActions from './review.reducer'

export function* getReview(api, action) {
  const { reviewId } = action
  // make the call to the api
  const apiCall = call(api.getReview, reviewId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ReviewActions.reviewSuccess(response.data))
  } else {
    yield put(ReviewActions.reviewFailure(response.data))
  }
}

export function* getReviews(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getReviews, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ReviewActions.reviewAllSuccess(response.data))
  } else {
    yield put(ReviewActions.reviewAllFailure(response.data))
  }
}

export function* updateReview(api, action) {
  const { review } = action
  // make the call to the api
  const idIsNotNull = !!review.id
  const apiCall = call(idIsNotNull ? api.updateReview : api.createReview, review)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ReviewActions.reviewUpdateSuccess(response.data))
  } else {
    yield put(ReviewActions.reviewUpdateFailure(response.data))
  }
}

export function* deleteReview(api, action) {
  const { reviewId } = action
  // make the call to the api
  const apiCall = call(api.deleteReview, reviewId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ReviewActions.reviewDeleteSuccess())
  } else {
    yield put(ReviewActions.reviewDeleteFailure(response.data))
  }
}
