import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getReview, getReviews, updateReview, deleteReview } from '../../../../../app/modules/entities/review/review.sagas'
import ReviewActions from '../../../../../app/modules/entities/review/review.reducer'

const stepper = fn => mock => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getReview(1)
  const step = stepper(getReview(FixtureAPI, { reviewId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReviewActions.reviewSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getReview(FixtureAPI, { reviewId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReviewActions.reviewFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getReviews()
  const step = stepper(getReviews(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReviewActions.reviewAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getReviews(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReviewActions.reviewAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateReview({ id: 1 })
  const step = stepper(updateReview(FixtureAPI, { review: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReviewActions.reviewUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateReview(FixtureAPI, { review: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReviewActions.reviewUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteReview({ id: 1 })
  const step = stepper(deleteReview(FixtureAPI, { reviewId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ReviewActions.reviewDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteReview(FixtureAPI, { reviewId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ReviewActions.reviewDeleteFailure()))
})
