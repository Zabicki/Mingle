import React from 'react'
import { ScrollView, Text, Image, View, Platform, TouchableHighlight } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'

import LearnMoreLinks from './learn-more-links.component.js'
import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {testScreen} from '../../navigation/layouts'

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
  }

  showSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  }

  navigationButtonPressed({ buttonId }) {
    this.showSideMenu()
  }

  render() {
    return (
      <View style={styles.mainContainer} testID="launchScreen">
        <View style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.wrapper}>
                <Text style={styles.text}>Date</Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.text}>Location</Text>
              </View>
            </View>
            <View style={styles.rowHost}>
              <View style={styles.wrapper}>
                <Image source={Images.football} style={styles.logo} />
              </View>
              <View style={styles.wrapper}>
                <View> 
                  <Text style={styles.textHost}>Host name</Text>
                  <Text style={styles.textHost}>Age</Text>
                </View>
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.textDescription}>Looking for someone who plays at intermediate level. Meeting at 3 pm at AGH, building C1</Text>
            </View>
            <View style={styles.row}>
              <TouchableHighlight testID="acceptButton" style={styles.wrapper} onPress={this.handlePressLogin} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Accept</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight testID="maybeButton" style={styles.wrapper} onPress={this.handlePressCancel} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Maybe</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight testID="declineButton" style={styles.wrapper} onPress={this.handlePressCancel} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Decline</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
