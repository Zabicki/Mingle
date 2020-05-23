import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { eventEntityDetailScreen, eventEntityEditScreen } from '../../../navigation/layouts'
import EventActions from './event.reducer'
import styles from './events-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class EventsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.props.getAccount()

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      done: false,
      dataObjects: [],
      
    }
    this.fetchEvents()
  }

  navigationButtonPressed({ buttonId }) {
    eventEntityEditScreen({ entityId: null })
  }
 
  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={eventEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
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
    this.props.findEventsAcceptedByUser({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchEvents()
      },
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.events) {
      return {
        done: nextProps.events.length < prevState.size,
        dataObjects: [...prevState.dataObjects, ...nextProps.events],
      }
    }
    return null
  }

  render() {
    return (
      <View style={styles.container} testID="eventScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          /* ListHeaderComponent={this.renderHeader} */
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    // ...redux state to props here
    events: state.events.events,
    fetching: state.events.fetchingAll,
    error: state.events.errorAll,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllEvents: options => dispatch(EventActions.eventAllRequest(options)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventEntityScreen)
