import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import {resettableReducer} from 'reduxsauce'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

const resettable = resettableReducer("LOGOUT_SUCCESS")

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  chats: require('../../modules/entities/chat/chat.reducer').reducer,
  favourites: require('../../modules/entities/favourites/favourites.reducer').reducer,
  reviews: require('../../modules/entities/review/review.reducer').reducer,
  events: resettable(require('../../modules/entities/event/event.reducer').reducer),
  messages: require('../../modules/entities/message/message.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
