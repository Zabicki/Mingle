import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './favourites.reducer';
import { IFavourites } from 'app/shared/model/favourites.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFavouritesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FavouritesDetail extends React.Component<IFavouritesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { favouritesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Favourites [<b>{favouritesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="favourite">Favourite</span>
            </dt>
            <dd>{favouritesEntity.favourite}</dd>
            <dt>Favourites</dt>
            <dd>{favouritesEntity.favourites ? favouritesEntity.favourites.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/favourites" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/favourites/${favouritesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ favourites }: IRootState) => ({
  favouritesEntity: favourites.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouritesDetail);
