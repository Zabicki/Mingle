import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Review extends React.Component<IReviewProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { reviewList, match } = this.props;
    return (
      <div>
        <h2 id="review-heading">
          Reviews
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Review
          </Link>
        </h2>
        <div className="table-responsive">
          {reviewList && reviewList.length > 0 ? (
            <Table responsive aria-describedby="review-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Score</th>
                  <th>Review</th>
                  <th>Reviews</th>
                  <th>User</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {reviewList.map((review, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${review.id}`} color="link" size="sm">
                        {review.id}
                      </Button>
                    </td>
                    <td>{review.score}</td>
                    <td>{review.review}</td>
                    <td>{review.reviews ? review.reviews.id : ''}</td>
                    <td>{review.user ? review.user.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${review.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${review.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${review.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Reviews found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewList: review.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
