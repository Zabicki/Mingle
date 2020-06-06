import React from 'react'
import { TextInput, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Navigation, StackNavigator, createStackNavigator, createAppContainer  } from 'react-native-navigation'
import styles from './profile-screen.styles'
import AccountActions from '../../../shared/reducers/account.reducer'
import {connect} from "react-redux";


//export default
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getAccount()
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

  render() {
    return (
        <SafeAreaView style={styles.container}>
            {
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileImage}>
                    <Image source={require("../../../shared/images/default_profile.jpg")} style={styles.image} resizeMode="center"/>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.textName}
                    type="text"
                    value={this.props.account.firstName}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textAge}
                    type="text"
                    value={this.props.account.age.toString()}
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.textLocation}
                    type="text"
                    value={this.props.account.city}
                    editable={false}>
                  </TextInput>
                </View>
                <View style={styles.description}>
                  <TextInput
                    style={styles.textDescription}
                    type="text"
                    value={this.props.account.description}
                    editable={false}
                    multiline={true}>
                  </TextInput>
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
