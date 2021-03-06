import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import {
  settingsScreen,
  preferencesScreen,
  profileScreen,
  goToAuth,
  maybeScreen,
  eventEntityEditScreen,
  myEventsScreen, chatEntityScreen,
} from '../layouts'
import { connect } from 'react-redux'

import styles from './drawer-content.styles'
import { Images } from '../../shared/themes'
import DrawerButton from './drawer-button'
import LoginActions from '../../modules/login/login.reducer'
import { isLoggedIn } from '../../shared/reducers/account.reducer'

class DrawerContent extends Component {
  constructor(context, props) {
    super(context, props)
    Navigation.events().bindComponent(this)
  }

  hideSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  handlePressSettings = () => {
    this.hideSideMenu()
    settingsScreen()
  }
  handlePressPreferences = () => {
    this.hideSideMenu()
    preferencesScreen()
  }
  handlePressProfile = () => {
    this.hideSideMenu()
    profileScreen()
  }
  handlePressMaybe = () => {
    this.hideSideMenu()
    maybeScreen()
  }
  handlePressMyEvents = () => {
    this.hideSideMenu()
    myEventsScreen()
  }
  handlePressLogout = () => {
    this.hideSideMenu()
    this.props.logout()
    goToAuth()
  }
  handlePressNewEvent = () =>{
    this.hideSideMenu()
    eventEntityEditScreen({ entityId: null })
  }
  handlePressChats = () =>{
    this.hideSideMenu()
    chatEntityScreen({ entityId: null })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image testID="drawerLogo" source={Images.logoLogin} style={styles.logo} />
        {<DrawerButton testID="profileDrawerButton" text="Profile" onPress={this.handlePressProfile} />}
        {<DrawerButton testID="newEventDrawerButton" text="New Event" onPress={this.handlePressNewEvent} />}
        {<DrawerButton testID="myEventsDrawerButton" text="My Events" onPress={this.handlePressMyEvents} />}
        {<DrawerButton testID="maybeDrawerButton" text="Maybe events" onPress={this.handlePressMaybe} />}
        {<DrawerButton testID="chatsButton" text="Chats" onPress={this.handlePressChats} />}
        {<DrawerButton testID="preferencesDrawerButton" text="Preferences" onPress={this.handlePressPreferences} />}
        {<DrawerButton testID="settingsDrawerButton" text="Settings" onPress={this.handlePressSettings} />}
        {<DrawerButton testID="logoutDrawerButton" text="Logout" onPress={this.handlePressLogout} />}
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    loggedIn: isLoggedIn(state.account),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent)
