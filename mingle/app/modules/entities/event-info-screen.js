import React from 'react'
import { Text, View, Image, TouchableHighlight, FlatList, List, ListItem, Alert} from "react-native";
import styles from './event-info-screen.styles'
import {Navigation} from 'react-native-navigation'
import EventActions from './event/event.reducer'
import {connect} from 'react-redux'
import {jsDateToLocalDate} from '../../shared/util/date-transforms'

//export default
class EventInfoScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    console.log('Entity id is', this.props.data.entityId)
    this.props.getEvent(this.props.data.entityId)
    console.log('Accept/decline buttons visible:', this.props.data.visible)

  }

  renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#000",
            }}
        />
    );
};

  renderItem(item) {
    return (
      <TouchableHighlight onPress={this.getListViewItem.bind(this, item)}>
        <View style={styles.row}>
          <View style={styles.profileImage}>
            <Image source={require("../../shared/images/default_profile.jpg")} style={styles.image} resizeMode="center"/>
          </View>
          <Text style={styles.item} >{item.firstName}</Text>
          <Text style={styles.item}>{item.age}</Text>
        </View>
    </TouchableHighlight>
    )
  }

  //accept event and remove from maybe
  handleAcceptButton = () => {
    this.props.acceptEvent(this.props.data.entityId)
    this.props.setMaybe([])
    Navigation.pop(this.props.componentId)
  }

  //remove from maybe
  handleDeclineButton = () => {
    console.log(this.props.maybe)
    let entityId = this.props.data.entityId
    let maybeWithoutCurrentEvent = this.props.maybe.filter(function(obj) {
      return obj.id !== entityId;
    });
    console.log('Maybe events without current event:\n', maybeWithoutCurrentEvent)
    this.props.setMaybe(maybeWithoutCurrentEvent)
    Navigation.pop(this.props.componentId)
  }

  getListViewItem = (item) => {
      Alert.alert(item.name);
      //go to user profile
  }

  render() {
    if (!this.props.event) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.title}>
          <Text style={styles.eventNameText}>
            {this.props.event.name}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {jsDateToLocalDate(this.props.event.date)}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {this.props.event.address}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text multiline={true} style={styles.textDescription}>
            {this.props.event.description}
          </Text>
        </View>
        {this.props.data.visible ? (
          <View style={styles.row} >
            <TouchableHighlight testID="acceptButton" style={styles.wrapper} onPress={this.handleAcceptButton} underlayColor="#D59F4E">
              <View style={styles.button}>
                <Text style={styles.textButton}>Accept</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight testID="declineButton" style={styles.wrapper} onPress={this.handleDeclineButton} underlayColor="#D59F4E">
              <View style={styles.button}>
                <Text style={styles.textButton}>Decline</Text>
              </View>
            </TouchableHighlight>
          </View>
        ) : null}

        <View style={styles.title}>
          <Text style={styles.text}>
            {'Participants'}
          </Text>
        </View>
        {<View style={styles.list}>
          <FlatList
                    data={this.props.event.participants}
                    renderItem={({ item }) => this.renderItem(item)}
                    ItemSeparatorComponent={this.renderSeparator}
                />
        </View>}
      </View>

    );
  }
}


const mapStateToProps = state => {
  return {
    event: state.events.event,
    maybe: state.events.maybeEvents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEvent: id => dispatch(EventActions.eventRequest(id)),
    acceptEvent: eventId => dispatch(EventActions.eventAcceptRequest(eventId)),
    setMaybe: maybeEvents => dispatch(EventActions.eventSetMaybe(maybeEvents)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventInfoScreen)
