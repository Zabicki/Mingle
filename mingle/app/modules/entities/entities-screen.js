import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
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
        <Text style={styles.centerText}>JHipster Entities will appear below</Text>
        <RoundedButton text="Chat" onPress={chatEntityScreen} testID="chatEntityScreenButton" />
        <RoundedButton text="Favourite" onPress={favouriteEntityScreen} testID="favouriteEntityScreenButton" />
        <RoundedButton text="Review" onPress={reviewEntityScreen} testID="reviewEntityScreenButton" />
        <RoundedButton text="Event" onPress={eventEntityScreen} testID="eventEntityScreenButton" />
        <RoundedButton text="Message" onPress={messageEntityScreen} testID="messageEntityScreenButton" />
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
