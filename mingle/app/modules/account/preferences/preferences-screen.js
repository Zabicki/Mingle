import React, { useState } from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View, CheckBox } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import { changePasswordScreen } from '../../../navigation/layouts'
import { loginScreen } from '../../../navigation/layouts'
import UserActions from '../../../shared/reducers/user.reducer'
import Dialog from "react-native-dialog";
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'


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
    this.props.getFavourites();
  }
  componentDidMount() {
    this.setState(
      (state) => {
        return {
          sportCheckBox: this.props.favourites.includes("SPORT"),
          foodCheckBox: this.props.favourites.includes("FOOD"),
          musicCheckBox: this.props.favourites.includes("MUSIC"),
          partyCheckBox: this.props.favourites.includes("PARTY"),
          educationCheckBox: this.props.favourites.includes("EDUCATION"),
          otherCheckBox: this.props.favourites.includes("OTHER"),
        };
      });
  }
  setFavourites = () => {
    let newFavourites = [];
    if (this.state.sportCheckBox) {
      newFavourites.push("SPORT");
    }
    if (this.state.foodCheckBox) {
      newFavourites.push("FOOD");
    }
    if (this.state.musicCheckBox) {
      newFavourites.push("MUSIC");
    }
    if (this.state.partyCheckBox) {
      newFavourites.push("PARTY");
    }
    if (this.state.educationCheckBox) {
      newFavourites.push("EDUCATION");
    }
    if (this.state.otherCheckBox) {
      newFavourites.push("OTHER");
    }
    this.props.updateFavourites(newFavourites);
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

        <View style={styles.buttonSection}>
          <TouchableHighlight style={styles.button} onPress={this.setFavourites} underlayColor="#D59F4E">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    favourites: state.users.favourites,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFavourites: () => dispatch(UserActions.userFavouritesRequest()),
    updateFavourites: (favourites) => dispatch(UserActions.userFavouritesUpdateRequest(favourites)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferencesScreen)
