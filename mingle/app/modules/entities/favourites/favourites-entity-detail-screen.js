import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { favouriteEntityEditScreen } from '../../../navigation/layouts'

import FavouriteActions from './favourites.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './favourites-entity-detail-screen-style'

class FavouriteEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getFavourite(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllFavourites()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Favourite?',
      'Are you sure you want to delete the Favourite?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteFavourite(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.favourite) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.favourite.id}</Text>
        <Text testID="favourite">Favourite: {this.props.favourite.favourite}</Text>
        <RoundedButton text="Edit" onPress={favouriteEntityEditScreen.bind(this, { entityId: this.props.favourite.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    favourite: state.favourites.favourite,
    deleting: state.favourites.deleting,
    errorDeleting: state.favourites.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFavourite: id => dispatch(FavouriteActions.favouriteRequest(id)),
    getAllFavourites: options => dispatch(FavouriteActions.favouriteAllRequest(options)),
    deleteFavourite: id => dispatch(FavouriteActions.favouriteDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteEntityDetailScreen)
