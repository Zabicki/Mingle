import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/message/message.reducer'

test('attempt retrieving a single message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.message).toBe(null)
})

test('attempt retrieving a list of message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.messages).toEqual([])
})

test('attempt updating a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.message).toEqual({ id: 1 })
})

test('success retrieving a list of message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.messages).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.message).toEqual({ id: 1 })
})
test('success deleting a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.message).toEqual(null)
})

test('failure retrieving a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.message).toEqual(null)
})

test('failure retrieving a list of message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.messages).toEqual([])
})

test('failure updating a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.message).toEqual(INITIAL_STATE.message)
})
test('failure deleting a message', () => {
  const state = reducer(INITIAL_STATE, Actions.messageDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.message).toEqual(INITIAL_STATE.message)
})
