import React from 'react'
import { ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import {
  loginScreen,
  chatEntityScreen,
  favouriteEntityScreen,
  reviewEntityScreen,
  eventEntityScreen,
  messageEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight testID="chatEntityScreenButton" style={styles.wrapper} onPress={chatEntityScreen} underlayColor="#D59F4E">
          <View style={styles.button}>
            <Text style={styles.textButton}>Chat</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight testID="favouriteEntityScreenButton" style={styles.wrapper} onPress={favouriteEntityScreen} underlayColor="#D59F4E">
          <View style={styles.button}>
            <Text style={styles.textButton}>Favourite</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight testID="reviewEntityScreenButton" style={styles.wrapper} onPress={reviewEntityScreen} underlayColor="#D59F4E">
          <View style={styles.button}>
            <Text style={styles.textButton}>Review</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight testID="eventEntityScreenButton" style={styles.wrapper} onPress={eventEntityScreen} underlayColor="#D59F4E">
          <View style={styles.button}>
            <Text style={styles.textButton}>Event</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight testID="messageEntityScreenButton" style={styles.wrapper} onPress={messageEntityScreen} underlayColor="#D59F4E">
          <View style={styles.button}>
            <Text style={styles.textButton}>Message</Text>
          </View>
        </TouchableHighlight>
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // for developer convenience
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntitiesScreen)
