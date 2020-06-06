import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { eventInfoScreen } from '../../../navigation/layouts'
import styles from './maybe-events-screen.styles'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class MaybeEventsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

  }

  renderRow({ item }) {
    return (
      <TouchableOpacity style={styles.button} onPress={eventInfoScreen.bind(this, { entityId: item.id , visible: true})} underlayColor="#D59F4E">
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

  render() {
    return (
      <View style={styles.container} testID="eventScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.userMaybeEvents}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
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
