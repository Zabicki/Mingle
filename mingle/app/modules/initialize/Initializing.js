import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { goToAuth, goHome } from '../../navigation/layouts'

import {connect} from 'react-redux'

import { isLoggedIn } from '../../shared/reducers/account.reducer'

function waitForStoreLoad(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Initializing extends React.Component {

  async componentDidMount() {

    // sometimes loggedIn property was wrongly evaluated as false, 1 second wait solved the problem
    await waitForStoreLoad(1000)

    try {
      if (this.props.loggedIn) {
        console.log('Logged in, going to home screen. Logged in = ', this.props.loggedIn)
        goHome()
      } else {
        console.log('Not logged in, going to login screen. Logged in = ', this.props.loggedIn)
        goToAuth()
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    loggedIn: isLoggedIn(state.account),
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Initializing)
