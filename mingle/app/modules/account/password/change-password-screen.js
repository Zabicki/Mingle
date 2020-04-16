import React from 'react'
import { View, Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'

import ChangePasswordActions from '../password/change-password.reducer'
import styles from './change-password-screen.styles'

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
class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formModel: t.struct({
        currentPassword: t.String,
        newPassword: t.String,
        confirmPassword: t.String,
      }),
      formValue: { password: null, confirmPassword: null },
      formOptions: {
        auto: 'placeholders',
        fields: {
          currentPassword: {
            secureTextEntry: true,
            testID: 'currentPasswordInput',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('newPassword').refs.input.focus(),
          },
          newPassword: {
            secureTextEntry: true,
            testID: 'newPasswordInput',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('confirmPassword').refs.input.focus(),
          },
          confirmPassword: {
            secureTextEntry: true,
            testID: 'confirmPasswordInput',
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
          },
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
      if (value.newPassword !== value.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }])
        return
      }
      this.props.changePassword(value.currentPassword, value.newPassword)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetching && !this.props.fetching) {
      if (this.props.error) {
        Alert.alert('Error', this.props.error, [{ text: 'OK' }])
      } else {
        Alert.alert('Success', 'Password changed', [{ text: 'OK' }])
      }
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
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
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <View style={styles.buttonSection}>
            <TouchableHighlight testID="changePasswordSubmitButton" style={styles.button} onPress={this.submitForm} underlayColor="#D59F4E">
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.changePassword.fetching,
    error: state.changePassword.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (currentPassword, newPassword) => dispatch(ChangePasswordActions.changePasswordRequest(currentPassword, newPassword)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen)
