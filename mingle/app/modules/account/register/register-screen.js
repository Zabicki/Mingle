import React from 'react'
import { View, Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation'
import t from 'tcomb-form-native'

import RegisterActions from '../register/register.reducer'
// Styles
import styles from './register-screen.styles'

let Form = t.form.Form

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderTopWidth = 0;
stylesheet.textbox.error.borderTopWidth = 0;
stylesheet.textbox.normal.borderLeftWidth = 0;
stylesheet.textbox.error.borderLeftWidth = 0;
stylesheet.textbox.normal.borderRightWidth = 0;
stylesheet.textbox.error.borderRightWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.fontSize = 16;
stylesheet.textbox.error.fontSize = 16;

stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;
stylesheet.textboxView.normal.marginTop = 8;
stylesheet.textboxView.error.marginTop = 8;

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      accountModel: t.struct({
        name: t.String,
        login: t.String,
        password: t.String,
        confirmPassword: t.String,
        email: t.String,
        birthDate: t.Date,
        langKey: t.String,
      }),
      accountValue: { name: null, login: null, password: null, confirmPassword: null, email: null, birthDate: null, langKey: 'en' },
      options: {
        auto: 'placeholders',
        fields: {
          name: {
            error: 'Enter name',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('login').refs.input.focus(),
          },
          login: {
            error: 'Enter login',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('password').refs.input.focus(),
          },
          password: {
            error: 'Enter password',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('confirmPassword').refs.input.focus(),
          },
          confirmPassword: {
            error: 'Confirm password',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('email').refs.input.focus(),
          },
          email: {
            error: 'Enter e-mail address',
            returnKeyType: 'done',
          },
          birthDate: {
            defaultValueText: 'Enter birth date',
            mode: 'date',
            dialogMode: 'calendar',
            error: 'Enter birth date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.submitUpdate(),
          },
          langKey: {
            hidden: true,
          },
        },
        stylesheet: stylesheet,
      },
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  handlePressCancel = () => {
    Navigation.pop(this.props.componentId)
  }

  submitUpdate() {
    // call getValue() to get the values of the form
    const value = this.form.getValue()
    if (value) {
      // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }])
        return
      }
      this.props.register(value)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        Alert.alert('Error', this.props.error, [{ text: 'OK' }])
      } else {
        Navigation.popToRoot(this.props.componentId)
        Alert.alert('Registration Successful', 'Please check your email', [{ text: 'OK' }])
      }
    }
  }

  accountChange(newValue) {
    this.setState({
      accountValue: newValue,
    })
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
            <TouchableHighlight style={styles.button} onPress={this.submitUpdate} underlayColor="#D59F4E">
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.handlePressCancel} underlayColor="#D59F4E">
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.register.fetching,
    error: state.register.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: account => dispatch(RegisterActions.registerRequest(account)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen)
