// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = userAuth => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = userAuth => api.post('api/authenticate', userAuth)
  const register = user => api.post('api/register', user)
  const forgotPassword = data =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })

  const getAccount = () => api.get('api/account')
  const updateAccount = account => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    )

  const getUser = userId => api.get('api/users/' + userId)
  const getUsers = options => api.get('api/users', options)
  const createUser = user => api.post('api/users', user)
  const updateUser = user => api.put('api/users', user)
  const deleteUser = userId => api.delete('api/users/' + userId)

  const getChat = chatId => api.get('api/chats/' + chatId)
  const getChats = options => api.get('api/chats', options)
  const createChat = chat => api.post('api/chats', chat)
  const updateChat = chat => api.put('api/chats', chat)
  const deleteChat = chatId => api.delete('api/chats/' + chatId)

  const getFavourite = favouriteId => api.get('api/favourites/' + favouriteId)
  const getFavourites = options => api.get('api/favourites', options)
  const createFavourite = favourite => api.post('api/favourites', favourite)
  const updateFavourite = favourite => api.put('api/favourites', favourite)
  const deleteFavourite = favouriteId => api.delete('api/favourites/' + favouriteId)

  const getReview = reviewId => api.get('api/reviews/' + reviewId)
  const getReviews = options => api.get('api/reviews', options)
  const createReview = review => api.post('api/reviews', review)
  const updateReview = review => api.put('api/reviews', review)
  const deleteReview = reviewId => api.delete('api/reviews/' + reviewId)

  const getEvent = eventId => api.get('api/events/' + eventId)
  const getEvents = options => api.get('api/events', options)
  const createEvent = event => api.post('api/events', event)
  const updateEvent = event => api.put('api/events', event)
  const deleteEvent = eventId => api.delete('api/events/' + eventId)
  const acceptEvent = eventId => api.put('api/events/accept/' + eventId)
  const getNearby = (options, latitude, longitude, radius) => api.get(`api/events/near/${latitude}/${longitude}/${radius}`,options)
  const getFromCity = (options, city) => api.get('api/events/city/' + city, options)
  const getHosted = options => api.get('api/events/user/hosted',options)
  const getAccepted = options => api.get('api/events/user/accepted',options)

  const getMessage = messageId => api.get('api/messages/' + messageId)
  const getMessages = options => api.get('api/messages', options)
  const createMessage = message => api.post('api/messages', message)
  const updateMessage = message => api.put('api/messages', message)
  const deleteMessage = messageId => api.delete('api/messages/' + messageId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createChat,
    updateChat,
    getChats,
    getChat,
    deleteChat,

    createFavourite,
    updateFavourite,
    getFavourites,
    getFavourite,
    deleteFavourite,

    createReview,
    updateReview,
    getReviews,
    getReview,
    deleteReview,

    createEvent,
    updateEvent,
    getEvents,
    getEvent,
    deleteEvent,
    acceptEvent,
    getNearby,
    getFromCity,
    getHosted,
    getAccepted,

    createMessage,
    updateMessage,
    getMessages,
    getMessage,
    deleteMessage,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
