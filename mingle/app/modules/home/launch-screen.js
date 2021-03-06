import React from 'react'
import {Text, Image, View, TouchableHighlight, Alert} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation';
import Dialog from 'react-native-dialog';

import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import EventAction from '../entities/event/event.reducer'

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions'

export class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
        page: 0,
        sort: 'id,asc',
        size: 5,
        position: 0,
        location: null,
        permission: null,
        city: 'null',
        cityInput: '',
        byCity: false,
        showDialog: false,
        image: null,
    }
    this.handlePermissions();
  }

  fetchEvents = () =>{
    const options = {
      page: this.state.page,
      sort: this.state.sort,
      size: this.state.size,
    };
    if(this.state.permission && !this.state.byCity){
      this.props.getNearbyEvents(options, this.state.location.latitude, this.state.location.longitude, 20);
    }
    else{
      this.props.getFromCity(options, this.state.city);
    }
  }

  getLocation = () =>{
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
        location: position.coords,
        },
        ()=> this.fetchEvents())
      },
      (error) => {alert(error.message)},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
    );
  }

  handlePermissions = () =>{
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
      (result) => {
        switch (result){
          case RESULTS.GRANTED:
            this.setState({
            permission: true,
            },
            ()=> this.getLocation());
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
              (res) =>{
                if (res == RESULTS.GRANTED){
                  this.setState({permission: true}, ()=> this.getLocation());
                }
                else{
                  this.setState({permission: false}, ()=> this.fetchEvents());
                }
              }
            );
            break;
          default :
            this.setState({permission: false}, ()=> this.fetchEvents());
            break;
        }
      }
    );
  }

  getImageForEvent = (category) => {
    if (category === "SPORT") {
        return Images.football
    }
    if (category === "MUSIC") {
      return Images.musicNote
    }
    if (category === "PARTY") {
      return Images.drink
    }
    if (category === "FOOD") {
      return Images.musicNote
    }
    if (category === "EDUCATION") {
      return Images.book
    }
    if (category === "OTHER") {
      return Images.other
    }
  }

  showNext = () =>{
    if (this.state.position +1 < this.state.size){
      this.setState(
        {
          position: this.state.position+1,
        },
      )
    } else {
      this.setState(
        {
          position: 0,
          page: this.state.page +1,
        },
        () => {
          this.fetchEvents()
        },
      )
    }
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
    if(buttonId == 'menuButton'){
      this.showSideMenu()
    }else if(buttonId == 'byCity'){
      this.setState({showDialog: true})
    }else if(buttonId == 'reload'){
      this.setState({
        page: 0,
        position: 0,
        location: null,
        permission: null,
        city: 'null',
        cityInput: '',
        byCity: false,
        showDialog: false,
      },
      ()=> this.handlePermissions()
      )
    }
  }

  handleAcceptButton = () => {
    this.props.acceptEvent(this.props.events[this.state.position].id)
    this.showNext()
  }

  handleMaybeButton = () => {
    console.log(this.props.maybe)
  if(this.props.maybe){
    this.props.setMaybe(this.props.maybe.concat(this.props.events[this.state.position]))
  }
  else{
    this.props.setMaybe([this.props.events[this.state.position]])
  }
    console.log(this.props.maybe)
    this.showNext()
  }

  handleDeclineButton = () => {
    this.showNext()
  }
  handleCitySearch = () =>{
    this.setState((prev,state) => {

    return {
      city: prev.cityInput,
      showDialog: false,
      byCity: true,
      position: 0,
      page: 0,
    }},
    ()=> this.fetchEvents()
    )
  }
  handleCancel = () =>{
    this.setState({
      showDialog: false,
      cityInput: '',
    })
  }

  render() {
   const {events} = this.props
   const {position} = this.state
    return (
      <View style={styles.mainContainer} testID="launchScreen">
        <Dialog.Container visible={this.state.showDialog}>
          <Dialog.Title>Search by city</Dialog.Title>
           <Dialog.Input style = {styles.textInput}  placeholder="Enter city..." onChangeText={(city) => this.setState({cityInput: city})}/>
           <Dialog.Button label="Cancel" onPress={this.handleCancel} />
           <Dialog.Button label="Ok" onPress={this.handleCitySearch} />
        </Dialog.Container>
      { events && events[position] ? (

        <View style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.wrapper}>

                <Text style={styles.text}>
                  {events[position] ?  events[position].date: 'Date'}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.locationText}>
                  {events[position] ?  events[position].address : 'Location'}
                </Text>
              </View>
            </View>
            <View style={styles.rowHost}>
              <View style={styles.wrapper}>
                <Image source={ this.getImageForEvent(events[position].category) }
                 style={styles.logo} />
              </View>
              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.textHost}>
                    {events[position] ?  events[position].host.firstName : 'Host Name'}
                  </Text>
                  <Text style={styles.textHost}>{events[position].host.age}</Text>
                </View>
              </View>
            </View>
            <View style={styles.eventName}>
              <Text style={styles.eventNameText}>
                {events[position] ?  events[position].name :
                  'Event name'}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.textDescription}>
              {events[position] ?  events[position].description :
              'Description'}
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableHighlight testID="acceptButton" style={styles.wrapper} onPress={this.handleAcceptButton} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Accept</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight testID="maybeButton" style={styles.wrapper} onPress={this.handleMaybeButton} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Maybe</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight testID="declineButton" style={styles.wrapper} onPress={this.handleDeclineButton} underlayColor="#D59F4E">
                <View style={styles.button}>
                  <Text style={styles.textButton}>Decline</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        ):
        (
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              No new events found!
            </Text>
           </View>
        )
         }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    events: state.events.events,
    fetching: state.events.fetchingAll,
    error:  state.events.errorAll,
    maybe: state.events.maybeEvents,
    account: state.account.account,
    }
  }

const mapDispatchToProps = dispatch =>{
  return{
    getAllEvents: options => dispatch(EventAction.eventAllRequest(options)),
    getNearbyEvents: (options, latitude, longitude, radius) => dispatch(EventAction.eventAllNearbyRequest(options, latitude, longitude, radius)),
    getFromCity: (options, city) => dispatch(EventAction.eventAllFromCityRequest(options, city)),
    acceptEvent: eventId => dispatch(EventAction.eventAcceptRequest(eventId)),
    setMaybe: maybeEvents => dispatch(EventAction.eventSetMaybe(maybeEvents)),
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)  (LaunchScreen)

