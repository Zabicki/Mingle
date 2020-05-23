import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getChat, getChats, updateChat, deleteChat } from '../../../../../app/modules/entities/chat/chat.sagas'
import ChatActions from '../../../../../app/modules/entities/chat/chat.reducer'

const stepper = fn => mock => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getChat(1)
  const step = stepper(getChat(FixtureAPI, { chatId: { id: 1 }, options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChatActions.chatMessagesSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getChat(FixtureAPI, { chatId: { id: 1 }, options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ChatActions.chatMessagesFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getChats()
  const step = stepper(getChats(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChatActions.chatAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getChats(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ChatActions.chatAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateChat({ id: 1 })
  const step = stepper(updateChat(FixtureAPI, { chat: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChatActions.chatUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateChat(FixtureAPI, { chat: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ChatActions.chatUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteChat({ id: 1 })
  const step = stepper(deleteChat(FixtureAPI, { chatId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ChatActions.chatDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteChat(FixtureAPI, { chatId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ChatActions.chatDeleteFailure()))
})
