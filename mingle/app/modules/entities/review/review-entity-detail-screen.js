import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { reviewEntityEditScreen } from '../../../navigation/layouts'

import ReviewActions from './review.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './review-entity-detail-screen-style'

class ReviewEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getReview(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllReviews()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Review?',
      'Are you sure you want to delete the Review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteReview(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.review) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.review.id}</Text>
        <Text testID="score">Score: {this.props.review.score}</Text>
        <Text testID="review">Review: {this.props.review.review}</Text>
        <RoundedButton text="Edit" onPress={reviewEntityEditScreen.bind(this, { entityId: this.props.review.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    review: state.reviews.review,
    deleting: state.reviews.deleting,
    errorDeleting: state.reviews.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReview: id => dispatch(ReviewActions.reviewRequest(id)),
    getAllReviews: options => dispatch(ReviewActions.reviewAllRequest(options)),
    deleteReview: id => dispatch(ReviewActions.reviewDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewEntityDetailScreen)
