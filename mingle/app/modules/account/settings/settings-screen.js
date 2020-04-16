import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import { Navigation } from 'react-native-navigation'
import {changePasswordScreen} from '../../../navigation/layouts'
import AccountActions from '../../../shared/reducers/account.reducer'
// Styles
import styles from './settings-screen.styles'

const Form = t.form.Form

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        firstName: t.maybe(t.String),
        lastName: t.maybe(t.String),
        login: t.String,
        email: t.maybe(t.String),
        langKey: t.String,
        show_current_localisation: t.Boolean,
      }),
      accountValue: this.props.account,
      options: {
        fields: {
          firstName: {
            hidden: true,
          },
          lastName: {
            hidden: true,
          },
          login: {
            hidden: true,
          },
          email: {
            hidden: true,
          },
          langKey: {
            hidden: true,
          },
          show_current_localisation: {
            hidden: false,
          },
        },
      },
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  submitUpdate() {
    // call getValue() to get the values of the form
    const value = this.form.getValue()
    if (value) {
      // if validation fails, value will be null
      this.props.updateAccount(value)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', this.props.error, [{ text: 'OK' }])
      } else {
        Alert.alert('Success', 'Settings updated', [{ text: 'OK' }])
        this.props.getAccount()
      }
    }
  }

  accountChange(newValue) {
    this.setState({
      accountValue: newValue,
    })
  }
  handlePressChangePassword = () => {
    changePasswordScreen()
  }
  deleteAccount = () => {

  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref={c => {
              this.form = c
            }}
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
            onChange={this.accountChange}
          />
          <View style={styles.buttonSection}>
            <TouchableHighlight testID="changePasswordButton" style={styles.button} onPress={this.handlePressChangePassword} underlayColor="Colors.sun">
              <Text style={styles.buttonText}>Change password</Text>
            </TouchableHighlight>
            <TouchableHighlight testID="changeDeleteAccount" style={styles.button} onPress={this.deleteAccount} underlayColor="Colors.sun">
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableHighlight>
           </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAccount: account => dispatch(AccountActions.accountUpdateRequest(account)),
    getAccount: () => dispatch(AccountActions.accountRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen)
