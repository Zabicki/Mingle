import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/review/review.reducer'

test('attempt retrieving a single review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.review).toBe(null)
})

test('attempt retrieving a list of review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.reviews).toEqual([])
})

test('attempt updating a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.review).toEqual({ id: 1 })
})

test('success retrieving a list of review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.reviews).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.review).toEqual({ id: 1 })
})
test('success deleting a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.review).toEqual(null)
})

test('failure retrieving a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.review).toEqual(null)
})

test('failure retrieving a list of review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.reviews).toEqual([])
})

test('failure updating a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.review).toEqual(INITIAL_STATE.review)
})
test('failure deleting a review', () => {
  const state = reducer(INITIAL_STATE, Actions.reviewDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.review).toEqual(INITIAL_STATE.review)
})
