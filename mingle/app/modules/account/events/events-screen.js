import React from 'react'
import {FlatList, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { eventInfoScreen } from '../../../navigation/layouts'
import EventActions from '../../entities/event/event.reducer'
import styles from './events-screen.styles'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class EventsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      done: false,
      myEvents: [],

    }
    this.fetchEvents()
  }

  renderRow({ item }) {
    return (
        <TouchableOpacity style={styles.button} onPress={eventInfoScreen.bind(this, { entityId: item.id, visible: false})} underlayColor="#D59F4E">
          <View style={styles.row}>
            <Text style={styles.itemName} >{item.name}</Text>
            <Text style={styles.item}>{item.host.firstName}</Text>
          </View>
        </TouchableOpacity>
    )
  }


  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Events Found" show={!this.props.fetching} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchEvents = () => {
    this.props.getAllAcceptedEvents({ page: this.state.page, sort: this.state.sort, size: this.state.size })
    this.props.getAllHostedEvents({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  render() {
    console.log('Accepted:', this.state.myEvents)
    console.log('Hosted: ', this.state.hostedEvents)
    return (
      <View style={styles.container} testID="eventScreen">
        <Text style={styles.sectionText}>
          Participated events
        </Text>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.myEvents}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Text style={styles.sectionText}>
          Hosted events
        </Text>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.hostedEvents}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>

    )
  }
}

const mapStateToProps = state => {
  return {
    myEvents: state.events.myEvents,
    hostedEvents: state.events.hostedEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllAcceptedEvents: options => dispatch(EventActions.eventAllAcceptedRequest(options)),
    getAllHostedEvents: options => dispatch(EventActions.eventAllHostedRequest(options))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsScreen)
