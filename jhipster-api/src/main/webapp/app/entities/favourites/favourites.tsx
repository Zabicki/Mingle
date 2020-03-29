import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './favourites.reducer';
import { IFavourites } from 'app/shared/model/favourites.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFavouritesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Favourites extends React.Component<IFavouritesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { favouritesList, match } = this.props;
    return (
      <div>
        <h2 id="favourites-heading">
          Favourites
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Favourites
          </Link>
        </h2>
        <div className="table-responsive">
          {favouritesList && favouritesList.length > 0 ? (
            <Table responsive aria-describedby="favourites-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Favourite</th>
                  <th>Favourites</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {favouritesList.map((favourites, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${favourites.id}`} color="link" size="sm">
                        {favourites.id}
                      </Button>
                    </td>
                    <td>{favourites.favourite}</td>
                    <td>{favourites.favourites ? favourites.favourites.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${favourites.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${favourites.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${favourites.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Favourites found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ favourites }: IRootState) => ({
  favouritesList: favourites.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
