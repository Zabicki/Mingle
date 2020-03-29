import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getMessage, getMessages, updateMessage, deleteMessage } from '../../../../../app/modules/entities/message/message.sagas'
import MessageActions from '../../../../../app/modules/entities/message/message.reducer'

const stepper = fn => mock => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getMessage(1)
  const step = stepper(getMessage(FixtureAPI, { messageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageActions.messageSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getMessage(FixtureAPI, { messageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageActions.messageFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getMessages()
  const step = stepper(getMessages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageActions.messageAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getMessages(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageActions.messageAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateMessage({ id: 1 })
  const step = stepper(updateMessage(FixtureAPI, { message: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageActions.messageUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateMessage(FixtureAPI, { message: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageActions.messageUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteMessage({ id: 1 })
  const step = stepper(deleteMessage(FixtureAPI, { messageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MessageActions.messageDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteMessage(FixtureAPI, { messageId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MessageActions.messageDeleteFailure()))
})
