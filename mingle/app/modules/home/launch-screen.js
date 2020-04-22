import React from 'react'
import { ScrollView, Text, Image, View, Platform, TouchableHighlight } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import LearnMoreLinks from './learn-more-links.component.js'
import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import EventAction from '../entities/event/event.reducer'
import {launchScreen} from '../../navigation/layouts'

export class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    Navigation.events().bindComponent(this)

    this.state = {
        page: 0,
        sort: 'id,asc',
        size: 5,
        position: 0,
    }
  }

  fetchEvents = () =>{
    this.props.getAllEvents(this.state.page,this.state.sort, this.state.size)
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

  componentDidMount() {
    this.fetchEvents()
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

  handleAcceptButton = () => {
    this.props.acceptEvent(this.props.events[this.state.position].id)
    this.showNext()
  }

  handleMaybeButton = () => {
  if(this.props.maybe){
    this.props.setMaybe(this.props.maybe.concat(this.props.events[this.state.position]))
  }
  else{
    this.props.setMaybe([this.props.events[this.state.position]])
  }
    this.showNext()
  }

  handleDeclineButton = () => {
    this.showNext()
  }

  render() {
   const {events} = this.props
   const {position} =this.state
    return (
      <View style={styles.mainContainer} testID="launchScreen">
      { events && events[position] ? (
        <View style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.wrapper}>
                <Text style={styles.text}>
                  {events[position] ?  events[position].date : 'Date'}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.text}>
                  {events[position] ?  events[position].address : 'Location'}
                </Text>
              </View>
            </View>
            <View style={styles.rowHost}>
              <View style={styles.wrapper}>
                <Image source={ events[position] ?  { uri: `data:image/png;base64,${events[position].picture}` }: Images.football }
                 style={styles.logo} />
              </View>
              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.textHost}>
                    {events[position] ?  events[position].host.firstName + " " + events[position].host.lastName : 'Host Name'}
                  </Text>
                  <Text style={styles.textHost}>Age</Text>
                </View>
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.textDescription}>
              {events[position] ?  events[position].description :
              'Looking for someone who plays at intermediate level. Meeting at 3 pm at AGH, building C1'}
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
    }
  }

const mapDispatchToProps = dispatch =>{
  return{
    getAllEvents: options => dispatch(EventAction.eventAllRequest(options)),
    acceptEvent: eventId => dispatch(EventAction.eventAcceptRequest(eventId)),
    setMaybe: maybeEvents => dispatch(EventAction.eventSetMaybe(maybeEvents)),
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)  (LaunchScreen)

