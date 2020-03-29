import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import FavouriteActions from './favourites.reducer'

export function* getFavourite(api, action) {
  const { favouriteId } = action
  // make the call to the api
  const apiCall = call(api.getFavourite, favouriteId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FavouriteActions.favouriteSuccess(response.data))
  } else {
    yield put(FavouriteActions.favouriteFailure(response.data))
  }
}

export function* getFavourites(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFavourites, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FavouriteActions.favouriteAllSuccess(response.data))
  } else {
    yield put(FavouriteActions.favouriteAllFailure(response.data))
  }
}

export function* updateFavourite(api, action) {
  const { favourite } = action
  // make the call to the api
  const idIsNotNull = !!favourite.id
  const apiCall = call(idIsNotNull ? api.updateFavourite : api.createFavourite, favourite)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FavouriteActions.favouriteUpdateSuccess(response.data))
  } else {
    yield put(FavouriteActions.favouriteUpdateFailure(response.data))
  }
}

export function* deleteFavourite(api, action) {
  const { favouriteId } = action
  // make the call to the api
  const apiCall = call(api.deleteFavourite, favouriteId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FavouriteActions.favouriteDeleteSuccess())
  } else {
    yield put(FavouriteActions.favouriteDeleteFailure(response.data))
  }
}
