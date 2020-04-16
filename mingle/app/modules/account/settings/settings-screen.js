import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import {changePasswordScreen} from '../../../navigation/layouts'
import {loginScreen} from '../../../navigation/layouts'
import AccountActions from '../../../shared/reducers/account.reducer'
import Dialog from "react-native-dialog";
import LoginActions from '../../../modules/login/login.reducer'

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

  handleDeleteAccount = () => this.showDialog();

  state = {
    dialogVisible: false,
    enterPasswordVisible: false,
    invalidPasswordVisible: false,
    confirmationVisible: false
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleNo = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleYes = () => {
    this.setState({ dialogVisible: false, enterPasswordVisible: true });

  };
  handleCancel = () => {
    this.setState({ enterPasswordVisible: false });
  };
 
  handleDelete = () => {
    //Logic of deleting account
    //Compare passwords
    //if password OK
    //  condirmationVisible: true
    //else
    //  invalidPassword: true
    this.setState({enterPasswordVisible: false, confirmationVisible: true });

  };
  handlePassword = (password) => {
    console.log("password");
    console.log(password);
  }
  handleOk1 = () => {
    this.setState({invalidPasswordVisible: false });
  }
  handleOk2 = () => {
    this.setState({confirmationVisible: false });
    this.props.logout()
    loginScreen();
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
            <TouchableHighlight testID="changePasswordButton" style={styles.button} onPress={this.handlePressChangePassword} underlayColor="#FDB813">
              <Text style={styles.buttonText}>Change password</Text>
            </TouchableHighlight>
            <TouchableHighlight testID="changeDeleteAccount" style={styles.button} onPress={this.handleDeleteAccount} underlayColor="#FDB813">
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableHighlight>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Delete Account</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to delete your account? After deleting your account you won't be able to recover it.
              </Dialog.Description>
              <Dialog.Button label="No" onPress={this.handleNo} />
              <Dialog.Button label="Yes" onPress={this.handleYes} />
            </Dialog.Container>
            <Dialog.Container visible={this.state.enterPasswordVisible}>
              <Dialog.Title>Enter password</Dialog.Title>
              <Dialog.Description>
                Enter your password and press "Delete" button to delete your account.
              </Dialog.Description>
              <Dialog.Input style = {styles.textInput} secureTextEntry={true} label="Password" onChangeText={(password) => this.handlePassword(password)}></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button label="Delete" onPress={this.handleDelete} />
            </Dialog.Container>
            <Dialog.Container visible={this.state.invalidPasswordVisible}>
              <Dialog.Title>Invalid password</Dialog.Title>
              <Dialog.Button label="OK" onPress={this.handleOk1} />
            </Dialog.Container>
            <Dialog.Container visible={this.state.confirmationVisible}>
              <Dialog.Title>Confirmation</Dialog.Title>
              <Dialog.Description>
                Your account has been deleted.
              </Dialog.Description>
              <Dialog.Button label="OK" onPress={this.handleOk2} />
            </Dialog.Container>
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
    logout: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen)
