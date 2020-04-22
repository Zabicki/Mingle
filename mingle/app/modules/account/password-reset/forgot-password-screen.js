import React from 'react'
import { View, Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation'
import t from 'tcomb-form-native'

import ForgotPasswordActions from './forgot-password.reducer'
import styles from './forgot-password-screen.styles'
import {loginScreen} from '../../../navigation/layouts'

const Form = t.form.Form

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

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        email: t.String,
      }),
      formValue: this.props.forgotPassword,
      formOptions: {
        auto: 'placeholders',
        email: {
          returnKeyType: 'done',
          onSubmitEditing: () => this.submitForm(),
        },
        stylesheet: stylesheet,
      },
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submitForm() {
    // call getValue() to get the values of the form
    const value = this.form.getValue()
    if (value) {
      // if validation fails, value will be null
      this.props.resetPassword(value.email)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        Alert.alert('Error', this.props.error, [{ text: 'OK' }])
      } else {
        Alert.alert('Success', 'Password reset email sent', [{ text: 'OK' }])
        Navigation.popToRoot(this.props.componentId)
      }
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  handlePressCancel = () => {
    loginScreen()
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref={c => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <View style={styles.buttonSection}>
            <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#D59F4E">
              <Text style={styles.buttonText}>Reset</Text>
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
    fetching: state.forgotPassword.fetching,
    error: state.forgotPassword.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(ForgotPasswordActions.forgotPasswordRequest(email)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen)
