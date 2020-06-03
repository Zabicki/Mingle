import React, {createRef} from 'react'
import { TextInput, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native";
import t from 'tcomb-form-native'
import { Navigation, StackNavigator, createStackNavigator, createAppContainer  } from 'react-native-navigation'
import styles from './profile-screen.styles'
import AccountActions from '../../../shared/reducers/account.reducer'
import EditProfileScreen, {App} from './edit-profile-screen'
import RegisterActions from "../register/register.reducer";
import {connect} from "react-redux";
import { AppRegistry } from 'react-native';
import ImagePicker from 'react-native-image-picker';


//export default
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getAccount()
////
    this.state = {
      location: 'Cracow',
      description: 'I love playing football.',
      name: 'James Smith',
      age: '25',
      show_saving_button: false,

    }
    ////
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

  handleEditClik() {
    this.state.show_saving_button =  true,
    this.setState( {editable: !this.state.editable} )
  }

  handleSaveClik() {
    this.state.show_saving_button =  false,
    this.setState( {editable: !this.state.editable} )
    this.props.updateAccount(this.props.account)
    //save changes
  }

  
  launchImageLibrary = () => {  //todo
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            {!this.state.show_saving_button && 
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileImage}>
                    <Image source={require("../../../shared/images/photo.png")} style={styles.image} resizeMode="center"/>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.textName}
                    type="text" value={this.state.name}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textAge}
                    type="text" value={this.state.age} //type="text" value={this.props.account.age.toString()}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textLocation}
                    type="text" value={this.state.location}
                    editable={false}>
                  </TextInput>
                </View>
                <View style={styles.description}>
                  <TextInput
                    style={styles.textDescription}
                    type="text" value={this.state.description}
                    editable={false}
                    multiline={true}>
                  </TextInput>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity testID="editProfile" style={styles.button} onPress={this.handleEditClik.bind(this)} underlayColor="#FDB813">
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
            {this.state.show_saving_button && 
            <ScrollView style={styles.scrollView}>
              <View style = {styles.editPhoto}>
                <Text style={styles.textLocation}>Click on photo to launch gallery</Text>
              </View>
              
              <TouchableOpacity testID="changePhoto" onPress={this.launchImageLibrary}>
                <View style={styles.profileImageEdit}>
                    <Image source={require("../../../shared/images/photo.png")} style={styles.image} resizeMode="center" underlayColor="#FFFFFF"/>
                </View>
              </TouchableOpacity>
                
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.textName}
                    type="text" value={this.state.name} //type="text" value={this.props.account.firstName}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textAge}
                    type="text" value={this.state.age} //type="text" value={this.props.account.age.toString()}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textLocationEdit}
                    type="text" //type="text" value={this.props.account.city}
                    value={this.state.location}
                    onChangeText={(location) => this.setState({ location })}
                    editable={true}>
                  </TextInput>
                </View>
                <View style={styles.description}>
                  <TextInput
                    style={styles.textDescriptionEdit}
                    type="text" //type="text" value={this.props.account.description} 
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                    editable={true}
                    multiline={true}>
                  </TextInput>
                </View>
                <View style={styles.buttonSection}>
                  <TouchableHighlight testID="saveChanges" style={styles.button} onPress={this.handleSaveClik.bind(this)} underlayColor="#FDB813">
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableHighlight>
                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.account.fetching,
    account: state.account.account,
    error: state.account.error,
    updating: state.account.updating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccount: () => dispatch(AccountActions.accountRequest()),
    updateAccount: account => dispatch(AccountActions.accountUpdateRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen)