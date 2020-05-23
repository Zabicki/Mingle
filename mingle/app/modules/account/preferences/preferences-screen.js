import React, { useState } from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View, CheckBox} from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import {changePasswordScreen} from '../../../navigation/layouts'
import {loginScreen} from '../../../navigation/layouts'
import AccountActions from '../../../shared/reducers/account.reducer'
import Dialog from "react-native-dialog";
import LoginActions from '../../../modules/login/login.reducer'


// Styles
import styles from './preferences-screen.styles'

const Form = t.form.Form

class PreferencesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        sportCheckBox: false,
        foodCheckBox: false,
        musicCheckBox: false,
        partyCheckBox: false,
        educationCheckBox: false,
        otherCheckBox: false
      }
  }
  toggleChangeSport = () => {
    this.setState({
      sportCheckBox: !this.state.sportCheckBox,
    });
  }
  toggleChangeFood = () => {
    this.setState({
      foodCheckBox: !this.state.foodCheckBox,
    });
  }
  toggleChangeMusic = () => {
    this.setState({
      musicCheckBox: !this.state.musicCheckBox,
    });
  }
  toggleChangeParty = () => {
    this.setState({
      partyCheckBox: !this.state.partyCheckBox,
    });
  }
  toggleChangeEducation = () => {
    this.setState({
      educationCheckBox: !this.state.educationCheckBox,
    });
  }
  toggleChangeOther = () => {
    this.setState({
      otherCheckBox: !this.state.otherCheckBox,
    });
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>User preferences</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.sportCheckBox}
            onValueChange={this.toggleChangeSport}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Sport</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.foodCheckBox}
            onValueChange={this.toggleChangeFood}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Food</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.musicCheckBox}
            onValueChange={this.toggleChangeMusic}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Music</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.partyCheckBox}
            onValueChange={this.toggleChangeParty}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Party</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.educationCheckBox}
            onValueChange={this.toggleChangeEducation}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Education</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.otherCheckBox}
            onValueChange={this.toggleChangeOther}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Other</Text>
        </View>

      </View>
    )
  }
}

export default connect(
)(PreferencesScreen)
