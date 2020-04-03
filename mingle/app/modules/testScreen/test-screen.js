import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import SettingsScreen from '../account/settings/settings-screen'
import styles from './test-screen-styles'
import {settingsScreen} from '../../navigation/layouts'

class TestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible:false,
      dataSource:[]
    };
  }

  queryReviews() {
    this.setState({
      isVisible:true
    })
    fetch("localhost:8080/reviews", {
      method: 'GET'
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.centerText}>Query all reviews by clicking button below</Text>
        <RoundedButton text="Query entities" onPress={() => this.queryReviews()} testID="queryReviewsButton" />
        <RoundedButton text="Go to settings" onPress={settingsScreen} testID="settingsScreenButton" />
        {this.state.isVisible?<FlatList
          padding ={30}
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={{height: 50}}>
              <Text style={{height: 50}}>{item.title}</Text>
              <View style={{height: 1,backgroundColor:'gray'}}></View>
            </View>
          }
        />:null}
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}



export default connect()(TestScreen)
