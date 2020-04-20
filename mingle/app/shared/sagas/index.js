import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { ChatTypes } from '../../modules/entities/chat/chat.reducer'
import { FavouriteTypes } from '../../modules/entities/favourites/favourites.reducer'
import { ReviewTypes } from '../../modules/entities/review/review.reducer'
import { EventTypes } from '../../modules/entities/event/event.reducer'
import { MessageTypes } from '../../modules/entities/message/message.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getChat, getChats, updateChat, deleteChat } from '../../modules/entities/chat/chat.sagas'
import { getFavourite, getFavourites, updateFavourite, deleteFavourite } from '../../modules/entities/favourites/favourites.sagas'
import { getReview, getReviews, updateReview, deleteReview } from '../../modules/entities/review/review.sagas'
import { getEvent, getEvents, updateEvent, deleteEvent, acceptEvent } from '../../modules/entities/event/event.sagas'
import { getMessage, getMessages, updateMessage, deleteMessage } from '../../modules/entities/message/message.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(ChatTypes.CHAT_REQUEST, getChat, api),
    takeLatest(ChatTypes.CHAT_ALL_REQUEST, getChats, api),
    takeLatest(ChatTypes.CHAT_UPDATE_REQUEST, updateChat, api),
    takeLatest(ChatTypes.CHAT_DELETE_REQUEST, deleteChat, api),

    takeLatest(FavouriteTypes.FAVOURITE_REQUEST, getFavourite, api),
    takeLatest(FavouriteTypes.FAVOURITE_ALL_REQUEST, getFavourites, api),
    takeLatest(FavouriteTypes.FAVOURITE_UPDATE_REQUEST, updateFavourite, api),
    takeLatest(FavouriteTypes.FAVOURITE_DELETE_REQUEST, deleteFavourite, api),

    takeLatest(ReviewTypes.REVIEW_REQUEST, getReview, api),
    takeLatest(ReviewTypes.REVIEW_ALL_REQUEST, getReviews, api),
    takeLatest(ReviewTypes.REVIEW_UPDATE_REQUEST, updateReview, api),
    takeLatest(ReviewTypes.REVIEW_DELETE_REQUEST, deleteReview, api),

    takeLatest(EventTypes.EVENT_REQUEST, getEvent, api),
    takeLatest(EventTypes.EVENT_ALL_REQUEST, getEvents, api),
    takeLatest(EventTypes.EVENT_UPDATE_REQUEST, updateEvent, api),
    takeLatest(EventTypes.EVENT_DELETE_REQUEST, deleteEvent, api),
    takeLatest(EventTypes.EVENT_ACCEPT_REQUEST, acceptEvent, api),

    takeLatest(MessageTypes.MESSAGE_REQUEST, getMessage, api),
    takeLatest(MessageTypes.MESSAGE_ALL_REQUEST, getMessages, api),
    takeLatest(MessageTypes.MESSAGE_UPDATE_REQUEST, updateMessage, api),
    takeLatest(MessageTypes.MESSAGE_DELETE_REQUEST, deleteMessage, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ])
}
