import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDetail extends React.Component<IEventDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Event [<b>{eventEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{eventEntity.name}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{eventEntity.description}</dd>
            <dt>
              <span id="picture">Picture</span>
            </dt>
            <dd>
              {eventEntity.picture ? (
                <div>
                  <a onClick={openFile(eventEntity.pictureContentType, eventEntity.picture)}>
                    <img src={`data:${eventEntity.pictureContentType};base64,${eventEntity.picture}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {eventEntity.pictureContentType}, {byteSize(eventEntity.picture)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{eventEntity.city}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{eventEntity.address}</dd>
            <dt>
              <span id="maxParticpants">Max Particpants</span>
            </dt>
            <dd>{eventEntity.maxParticpants}</dd>
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="recurent">Recurent</span>
            </dt>
            <dd>{eventEntity.recurent ? 'true' : 'false'}</dd>
            <dt>
              <span id="interval">Interval</span>
            </dt>
            <dd>{eventEntity.interval}</dd>
            <dt>
              <span id="category">Category</span>
            </dt>
            <dd>{eventEntity.category}</dd>
            <dt>
              <span id="privacy">Privacy</span>
            </dt>
            <dd>{eventEntity.privacy}</dd>
            <dt>User</dt>
            <dd>{eventEntity.user ? eventEntity.user.id : ''}</dd>
            <dt>Events</dt>
            <dd>
              {eventEntity.events
                ? eventEntity.events.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === eventEntity.events.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
          </dl>
          <Button tag={Link} to="/event" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ event }: IRootState) => ({
  eventEntity: event.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
