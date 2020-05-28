import React from 'react'
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import {eventEntityDetailScreen, eventEntityEditScreen, eventInfoScreen} from '../../../navigation/layouts'
import EventActions from '../../entities/event/event.reducer'
import styles from './maybe-events-screen.styles'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class MaybeEventsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    /* ***********************************************************
     * STEP 1
     * This is an array of objects with the properties you desire
     * Usually this should come from Redux mapStateToProps
     *************************************************************/
    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      done: false,
      dataObjects: [],
    }
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({ item }) {
    return (
      <TouchableOpacity style={styles.button} onPress={eventInfoScreen.bind(this, { entityId: item.id })} underlayColor="#D59F4E">
        <View style={styles.row}>
          <Text style={styles.itemName} >{item.name}</Text>
          <Text style={styles.item}>{item.host.firstName}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/
  // Render a header?
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  // renderFooter = () =>
  //  <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Events Found" show={!this.props.fetching} />

  // renderSeparator = () =>
  //  <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

/*  handleLoadMore = () => {
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
  }*/

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
    userMaybeEvents: state.events.maybeEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaybeEventsScreen)