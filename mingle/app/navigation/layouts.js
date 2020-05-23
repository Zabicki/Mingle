import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import PreferencesScreen from '../modules/account/preferences/preferences-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import ProfileScreen from '../modules/account/profile/profile-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import ChatEntityScreen from '../modules/entities/chat/chat-entity-screen'
import ChatEntityDetailScreen from '../modules/entities/chat/chat-entity-detail-screen'
import ChatEntityEditScreen from '../modules/entities/chat/chat-entity-edit-screen'
import FavouriteEntityScreen from '../modules/entities/favourites/favourites-entity-screen'
import FavouriteEntityDetailScreen from '../modules/entities/favourites/favourites-entity-detail-screen'
import FavouriteEntityEditScreen from '../modules/entities/favourites/favourites-entity-edit-screen'
import ReviewEntityScreen from '../modules/entities/review/review-entity-screen'
import ReviewEntityDetailScreen from '../modules/entities/review/review-entity-detail-screen'
import ReviewEntityEditScreen from '../modules/entities/review/review-entity-edit-screen'
import EventEntityScreen from '../modules/entities/event/event-entity-screen'
import EventEntityDetailScreen from '../modules/entities/event/event-entity-detail-screen'
import EventEntityEditScreen from '../modules/entities/event/event-entity-edit-screen'
import MessageEntityScreen from '../modules/entities/message/message-entity-screen'
import MessageEntityDetailScreen from '../modules/entities/message/message-entity-detail-screen'
import MessageEntityEditScreen from '../modules/entities/message/message-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const PREFERENCES_SCREEN = 'nav.PreferencesScreen'
export const PROFILE_SCREEN = 'nav.ProfileScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const CHAT_ENTITY_SCREEN = 'nav.ChatEntityScreen'
export const CHAT_ENTITY_DETAIL_SCREEN = 'nav.ChatEntityDetailScreen'
export const CHAT_ENTITY_EDIT_SCREEN = 'nav.ChatEntityEditScreen'
export const FAVOURITE_ENTITY_SCREEN = 'nav.FavouriteEntityScreen'
export const FAVOURITE_ENTITY_DETAIL_SCREEN = 'nav.FavouriteEntityDetailScreen'
export const FAVOURITE_ENTITY_EDIT_SCREEN = 'nav.FavouriteEntityEditScreen'
export const REVIEW_ENTITY_SCREEN = 'nav.ReviewEntityScreen'
export const REVIEW_ENTITY_DETAIL_SCREEN = 'nav.ReviewEntityDetailScreen'
export const REVIEW_ENTITY_EDIT_SCREEN = 'nav.ReviewEntityEditScreen'
export const EVENT_ENTITY_SCREEN = 'nav.EventEntityScreen'
export const EVENT_ENTITY_DETAIL_SCREEN = 'nav.EventEntityDetailScreen'
export const EVENT_ENTITY_EDIT_SCREEN = 'nav.EventEntityEditScreen'
export const MESSAGE_ENTITY_SCREEN = 'nav.MessageEntityScreen'
export const MESSAGE_ENTITY_DETAIL_SCREEN = 'nav.MessageEntityDetailScreen'
export const MESSAGE_ENTITY_EDIT_SCREEN = 'nav.MessageEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={Images.logoLogin}
    />
  );
}

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT,
        },
      },
      center: {
        stack: {
          id: 'center',
          children: [
            {
              component: {
                name: LAUNCH_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'Events',
                      color: Colors.snow,
                    },
                    leftButtons: [
                      {
                        id: 'menuButton',
                        icon: Images.menuIcon,
                        testID: 'menuButton',
                        color: Colors.snow,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
}

let lastAppState = 'active'
function handleAppStateChange(nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount() {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL(event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log('Sending to Register Page')
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp() {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(PREFERENCES_SCREEN, () => PreferencesScreen, Provider, store)
  Navigation.registerComponentWithRedux(PROFILE_SCREEN, () => ProfileScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
  Navigation.registerComponentWithRedux(CHAT_ENTITY_SCREEN, () => ChatEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHAT_ENTITY_DETAIL_SCREEN, () => ChatEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHAT_ENTITY_EDIT_SCREEN, () => ChatEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(FAVOURITE_ENTITY_SCREEN, () => FavouriteEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(FAVOURITE_ENTITY_DETAIL_SCREEN, () => FavouriteEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(FAVOURITE_ENTITY_EDIT_SCREEN, () => FavouriteEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(REVIEW_ENTITY_SCREEN, () => ReviewEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(REVIEW_ENTITY_DETAIL_SCREEN, () => ReviewEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(REVIEW_ENTITY_EDIT_SCREEN, () => ReviewEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(EVENT_ENTITY_SCREEN, () => EventEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(EVENT_ENTITY_DETAIL_SCREEN, () => EventEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(EVENT_ENTITY_EDIT_SCREEN, () => EventEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(MESSAGE_ENTITY_SCREEN, () => MessageEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(MESSAGE_ENTITY_DETAIL_SCREEN, () => MessageEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(MESSAGE_ENTITY_EDIT_SCREEN, () => MessageEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow,
          },
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow,
        },
        background: {
          color: Colors.greyDark,
        },
      },
      sideMenu: {
        left: {
          enabled: false,
        },
      },
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  })

export const launchScreen = () =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: LAUNCH_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  })

export const registerScreen = () =>
  Navigation.push('center', {
    component: {
      name: REGISTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Sign Up',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const forgotPasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const changePasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHANGE_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Change Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const settingsScreen = () =>
  Navigation.push('center', {
    component: {
      name: SETTINGS_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const preferencesScreen = () =>
  Navigation.push('center', {
    component: {
      name: PREFERENCES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Preferences',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const profileScreen = () =>
  Navigation.push('center', {
    component: {
      name: PROFILE_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Profile',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const entitiesScreen = () =>
  Navigation.push('center', {
    component: {
      name: ENTITIES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Entities',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow,
          },
        },
      },
    },
  })
}

export const chatEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHAT_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Chats',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
            },
          ],
        },
      },
    },
  })

export const chatEntityEditScreen = data =>
  Navigation.push('center', {
    component: {
      name: CHAT_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Chats',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const chatEntityDetailScreen = data =>
  Navigation.push('center', {
    component: {
      name: CHAT_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Chats',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const favouriteEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: FAVOURITE_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Favourites',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
            },
          ],
        },
      },
    },
  })

export const favouriteEntityEditScreen = data =>
  Navigation.push('center', {
    component: {
      name: FAVOURITE_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Favourites',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const favouriteEntityDetailScreen = data =>
  Navigation.push('center', {
    component: {
      name: FAVOURITE_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Favourites',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const reviewEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: REVIEW_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Reviews',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
            },
          ],
        },
      },
    },
  })

export const reviewEntityEditScreen = data =>
  Navigation.push('center', {
    component: {
      name: REVIEW_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Reviews',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const reviewEntityDetailScreen = data =>
  Navigation.push('center', {
    component: {
      name: REVIEW_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Reviews',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const eventEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: EVENT_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Events',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
            },
          ],
        },
      },
    },
  })

export const eventEntityEditScreen = data =>
  Navigation.push('center', {
    component: {
      name: EVENT_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Events',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const eventEntityDetailScreen = data =>
  Navigation.push('center', {
    component: {
      name: EVENT_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Events',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const messageEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: MESSAGE_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Messages',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
            },
          ],
        },
      },
    },
  })

export const messageEntityEditScreen = data =>
  Navigation.push('center', {
    component: {
      name: MESSAGE_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Messages',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const messageEntityDetailScreen = data =>
  Navigation.push('center', {
    component: {
      name: MESSAGE_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Messages',
            color: Colors.snow,
          },
        },
      },
    },
  })
// ignite-jhipster-navigation-method-needle
