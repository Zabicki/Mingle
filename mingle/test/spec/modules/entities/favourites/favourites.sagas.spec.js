import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getFavourite,
  getFavourites,
  updateFavourite,
  deleteFavourite,
} from '../../../../../app/modules/entities/favourites/favourites.sagas'
import FavouriteActions from '../../../../../app/modules/entities/favourites/favourites.reducer'

const stepper = fn => mock => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFavourite(1)
  const step = stepper(getFavourite(FixtureAPI, { favouriteId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FavouriteActions.favouriteSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getFavourite(FixtureAPI, { favouriteId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FavouriteActions.favouriteFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFavourites()
  const step = stepper(getFavourites(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FavouriteActions.favouriteAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getFavourites(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FavouriteActions.favouriteAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFavourite({ id: 1 })
  const step = stepper(updateFavourite(FixtureAPI, { favourite: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FavouriteActions.favouriteUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateFavourite(FixtureAPI, { favourite: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FavouriteActions.favouriteUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteFavourite({ id: 1 })
  const step = stepper(deleteFavourite(FixtureAPI, { favouriteId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FavouriteActions.favouriteDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteFavourite(FixtureAPI, { favouriteId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FavouriteActions.favouriteDeleteFailure()))
})
