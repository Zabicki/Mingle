import React from 'react'
import { TextInput, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight } from "react-native";
import t from 'tcomb-form-native'
import { Navigation } from 'react-native-navigation'
import styles from './profile-screen.styles'


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = { 
      editable: false,
      name: "James Smith",
      age : "25",
      location: "Cracow",
      description: "I love playing sports, especially football and basketball. I'd love to join some sport events.",
      show_saving_button: false}
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
  }

  showSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  }

  navigationButtonPressed({ buttonId }) {
    this.showSideMenu()
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleEditClik() {
    this.state.show_saving_button =  true,
    this.setState( {editable: !this.state.editable} )
  } 

  handleSaveClik() {
    this.state.show_saving_button =  false,
    this.setState( {editable: !this.state.editable} )
    //save changes
  } 

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileImage}>
                    <Image source={require("../../../shared/images/photo.png")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput 
                    style={styles.textName} 
                    type="text" value={this.state.name} 
                    onChange={e => this.handleChange(e, "name")}
                    editable={this.state.editable}>
                  </TextInput>
                  <TextInput 
                    style={styles.textAge} 
                    type="text" value={this.state.age} 
                    onChange={e => this.handleChange(e, "age")}
                    editable={this.state.editable}>
                  </TextInput>
                  <TextInput 
                    style={styles.textLocation} 
                    type="text" value={this.state.location} 
                    onChange={e => this.handleChange(e, "location")}
                    editable={this.state.editable}>
                  </TextInput>
                </View>
                <View style={styles.description}>
                  <TextInput 
                    style={styles.textDescription} 
                    type="text" value={this.state.description} 
                    onChange={e => this.handleChange(e, "description")}
                    editable={this.state.editable}
                    multiline={true}>
                      
                  </TextInput>
                </View>
                <View style={styles.buttonSection}>
                  {!this.state.show_saving_button &&
                    <TouchableHighlight testID="editProfile" style={styles.button} onPress={this.handleEditClik.bind(this)} underlayColor="#FDB813">
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableHighlight>}

                  {this.state.show_saving_button && 
                  <TouchableHighlight testID="saveChanges" style={styles.button} onPress={this.handleSaveClik.bind(this)} underlayColor="#FDB813">
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableHighlight>}

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}
