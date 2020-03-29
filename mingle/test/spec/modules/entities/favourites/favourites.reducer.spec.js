import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/favourites/favourites.reducer'

test('attempt retrieving a single favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.favourite).toBe(null)
})

test('attempt retrieving a list of favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.favourites).toEqual([])
})

test('attempt updating a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.favourite).toEqual({ id: 1 })
})

test('success retrieving a list of favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.favourites).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.favourite).toEqual({ id: 1 })
})
test('success deleting a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.favourite).toEqual(null)
})

test('failure retrieving a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.favourite).toEqual(null)
})

test('failure retrieving a list of favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.favourites).toEqual([])
})

test('failure updating a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.favourite).toEqual(INITIAL_STATE.favourite)
})
test('failure deleting a favourite', () => {
  const state = reducer(INITIAL_STATE, Actions.favouriteDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.favourite).toEqual(INITIAL_STATE.favourite)
})
