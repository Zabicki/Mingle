import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/chat/chat.reducer'

test('attempt retrieving a single chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.chat).toBe(null)
})

test('attempt retrieving a list of chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.chats).toEqual([])
})

test('attempt updating a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.chat).toEqual({ id: 1 })
})

test('success retrieving a list of chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.chats).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.chat).toEqual({ id: 1 })
})
test('success deleting a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.chat).toEqual(null)
})

test('failure retrieving a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.chat).toEqual(null)
})

test('failure retrieving a list of chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.chats).toEqual([])
})

test('failure updating a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.chat).toEqual(INITIAL_STATE.chat)
})
test('failure deleting a chat', () => {
  const state = reducer(INITIAL_STATE, Actions.chatDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.chat).toEqual(INITIAL_STATE.chat)
})
