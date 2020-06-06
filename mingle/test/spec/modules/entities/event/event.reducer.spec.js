import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/event/event.reducer'

test('attempt retrieving a single event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.event).toBe(null)
})

test('attempt retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.events).toEqual([])
})

test('attempt updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.event).toEqual({ id: 1 })
})

test('success retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.events).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.event).toEqual({ id: 1 })
})
test('success deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.event).toEqual(null)
})

test('failure retrieving a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.event).toEqual(null)
})

test('failure retrieving a list of event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.events).toEqual([])
})

test('failure updating a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.event).toEqual(INITIAL_STATE.event)
})

test('failure deleting a event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.event).toEqual(INITIAL_STATE.event)
})

test('attempt accepting event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAcceptRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})

test('success accepting event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAcceptSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.event).toEqual({ id: 1 })
})

test('failure accepting event', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAcceptFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.event).toEqual(INITIAL_STATE.event)
})

test('attempt setting maybe events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSetMaybe([{ id: 1 },{id: 2}]))

  expect(state.maybeEvents).toEqual([{ id: 1},{id: 2}])
})

test('attempt retrieving a list of Nearby events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllNearbyRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.events).toEqual([])
})

test('success retrieving a list of Nearby events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllNearbySuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.events).toEqual([{ id: 1 }, { id: 2 }])
})

test('failure retrieving a list of Nearby events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllNearbyFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.events).toEqual([])
})

test('attempt retrieving a list of events from city', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllFromCityRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.events).toEqual([])
})

test('success retrieving a list of events from city', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllFromCitySuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.events).toEqual([{ id: 1 }, { id: 2 }])
})

test('failure retrieving a list of events from city', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllFromCityFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.events).toEqual([])
})

test('attempt retrieving a list of hosted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllHostedRequest({ id: 1 }))

  expect(state.fetchingHosted).toBe(true)
  expect(state.hostedEvents).toEqual([])
})

test('success retrieving a list of hosted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllHostedSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingHosted).toBe(false)
  expect(state.errorHosted).toBe(null)
  expect(state.hostedEvents).toEqual([{ id: 1 }, { id: 2 }])
})

test('failure retrieving a list of hosted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllHostedFailure({ error: 'Not found' }))

  expect(state.fetchingHosted).toBe(false)
  expect(state.errorHosted).toEqual({ error: 'Not found' })
  expect(state.hostedEvents).toEqual([])
})

test('attempt retrieving a list of accepted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllAcceptedRequest({ id: 1 }))

  expect(state.fetchingAccepted).toBe(true)
  expect(state.myEvents).toEqual([])
})

test('success retrieving a list of accepted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllAcceptedSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAccepted).toBe(false)
  expect(state.errorAccepted).toBe(null)
  expect(state.myEvents).toEqual([{ id: 1 }, { id: 2 }])
})

test('failure retrieving a list of accepted events', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllAcceptedFailure({ error: 'Not found' }))

  expect(state.fetchingAccepted).toBe(false)
  expect(state.errorAccepted).toEqual({ error: 'Not found' })
  expect(state.myEvents).toEqual([])
})
