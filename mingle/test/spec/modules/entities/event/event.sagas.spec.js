import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getEvent, getEvents, updateEvent, deleteEvent, acceptEvent, getNearby, getFromCity, getHosted, getAccepted } from '../../../../../app/modules/entities/event/event.sagas'
import EventActions from '../../../../../app/modules/entities/event/event.reducer'

const stepper = fn => mock => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getEvent(1)
  const step = stepper(getEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getEvents()
  const step = stepper(getEvents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getEvents(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateEvent({ id: 1 })
  const step = stepper(updateEvent(FixtureAPI, { event: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateEvent(FixtureAPI, { event: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteEvent({ id: 1 })
  const step = stepper(deleteEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventDeleteFailure()))
})

test('accept success path', () => {
  const response = FixtureAPI.acceptEvent(1)
  const step = stepper(acceptEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAcceptSuccess({ id: 1 })))
})

test('accept failure path', () => {
  const response = { ok: false }
  const step = stepper(acceptEvent(FixtureAPI, { eventId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAcceptFailure()))
})

test('getNearby success path', () => {
  const response = FixtureAPI.getNearby()
  const step = stepper(getNearby(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 }, latitude: 23, longitude: 22, radius: 15 }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllNearbySuccess([{ id: 1 }, { id: 2 }])))
})

test('getNearby failure path', () => {
  const response = { ok: false }
  const step = stepper(getNearby(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 }, latitude: 23, longitude: 22, radius: 15 }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllNearbyFailure()))
})

test('getFromCity success path', () => {
  const response = FixtureAPI.getFromCity()
  const step = stepper(getFromCity(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 }, city: 'Cracow' }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllFromCitySuccess([{ id: 1 }, { id: 2 }])))
})

test('getFromCity failure path', () => {
  const response = { ok: false }
  const step = stepper(getFromCity(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 }, city: 'city' }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllFromCityFailure()))
})

test('getHosted success path', () => {
  const response = FixtureAPI.getHosted()
  const step = stepper(getHosted(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllHostedSuccess([{ id: 1 }, { id: 2 }])))
})

test('getHosted failure path', () => {
  const response = { ok: false }
  const step = stepper(getHosted(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllHostedFailure()))
})

test('getAccepted success path', () => {
  const response = FixtureAPI.getAccepted()
  const step = stepper(getAccepted(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EventActions.eventAllAcceptedSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAccepted failure path', () => {
  const response = { ok: false }
  const step = stepper(getAccepted(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EventActions.eventAllAcceptedFailure()))
})
