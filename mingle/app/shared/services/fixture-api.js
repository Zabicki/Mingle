export default {
  // Functions return fixtures

  // entity fixtures
  updateChat: chat => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-chat.json'),
    }
  },
  getChats: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-chats.json'),
    }
  },
  getChat: chatId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-chat.json'),
    }
  },
  deleteChat: chatId => {
    return {
      ok: true,
    }
  },
  updateReview: review => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-review.json'),
    }
  },
  getReviews: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-reviews.json'),
    }
  },
  getReview: reviewId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-review.json'),
    }
  },
  deleteReview: reviewId => {
    return {
      ok: true,
    }
  },
  getFavourites: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-favourites.json'),
    }
  },
  updateFavourites: favourites => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-favourites.json'),
    }
  },
  updateEvent: event => {
    return {
      ok: true,
      data: require('../../shared/fixtures/accept-event.json'),
    }
  },
  acceptEvent: eventId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-event.json'),
    }
  },
  getEvents: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-events.json'),
    }
  },
  getEvent: eventId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-event.json'),
    }
  },
  deleteEvent: eventId => {
    return {
      ok: true,
    }
  },
  getNearby: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-events.json'),
    }
  },
  getFromCity: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-events.json'),
    }
  },
  getHosted: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-events.json'),
    }
  },
  getAccepted: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-events.json'),
    }
  },
  updateMessage: message => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-message.json'),
    }
  },
  getMessages: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-messages.json'),
    }
  },
  getMessage: messageId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-message.json'),
    }
  },
  deleteMessage: messageId => {
    return {
      ok: true,
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: user => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    }
  },
  getUser: userId => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    }
  },
  deleteUser: userId => {
    return {
      ok: true,
    }
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: authObj => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    }
  },
  updateAccount: () => {
    return {
      ok: true,
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Password error',
      }
    }
  },
}
