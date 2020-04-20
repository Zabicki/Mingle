import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventUpdateState {
  isNew: boolean;
  idsevents: any[];
  userId: string;
}

export class EventUpdate extends React.Component<IEventUpdateProps, IEventUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsevents: [],
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eventEntity } = this.props;
      const entity = {
        ...eventEntity,
        ...values,
        participants: mapIdList(values.participants),
        location: [values.X, values.Y]
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/event');
  };

  render() {
    const { eventEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { picture, pictureContentType } = eventEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="mingleApp.event.home.createOrEditLabel">Create or edit a Event</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="event-id">ID</Label>
                    <AvInput id="event-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="event-name">
                    Name
                  </Label>
                  <AvField
                    id="event-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-description">
                    Description
                  </Label>
                  <AvField
                    id="event-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="pictureLabel" for="picture">
                      Picture
                    </Label>
                    <br />
                    {picture ? (
                      <div>
                        <a onClick={openFile(pictureContentType, picture)}>
                          <img src={`data:${pictureContentType};base64,${picture}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {pictureContentType}, {byteSize(picture)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('picture')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_picture" type="file" onChange={this.onBlobChange(true, 'picture')} accept="image/*" />
                    <AvInput type="hidden" name="picture" value={picture} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="event-city">
                    City
                  </Label>
                  <AvField
                    id="event-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="event-address">
                    Address
                  </Label>
                  <AvField
                    id="event-address"
                    type="text"
                    name="address"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="locationX" for="event-LocationX">
                    Location
                  </Label>
                  <AvField id="event-locationX" type="string" className="form-control" name="X"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                   />
                </AvGroup>
                <AvGroup>
                  <Label id="locationY" for="event-LocationY">
                    Location
                  </Label>
                  <AvField id="event-locationY" type="string" className="form-control" name="Y"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                   />
                </AvGroup>
                <AvGroup>
                  <Label id="maxParticipantsLabel" for="event-maxParticipants">
                    Max Participants
                  </Label>
                  <AvField id="event-maxParticipants" type="string" className="form-control" name="maxParticipants" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="event-date">
                    Date
                  </Label>
                  <AvField
                    id="event-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="recurrentLabel" check>
                    <AvInput id="event-recurrent" type="checkbox" className="form-control" name="recurrent" />
                    Recurrent
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="intervalLabel" for="event-interval">
                    Interval
                  </Label>
                  <AvField id="event-interval" type="string" className="form-control" name="interval" />
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel" for="event-category">
                    Category
                  </Label>
                  <AvInput
                    id="event-category"
                    type="select"
                    className="form-control"
                    name="category"
                    value={(!isNew && eventEntity.category) || 'SPORT'}
                  >
                    <option value="SPORT">SPORT</option>
                    <option value="FOOD">FOOD</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="PARTY">PARTY</option>
                    <option value="OTHER">OTHER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="privacyLabel" for="event-privacy">
                    Privacy
                  </Label>
                  <AvInput
                    id="event-privacy"
                    type="select"
                    className="form-control"
                    name="privacy"
                    value={(!isNew && eventEntity.privacy) || 'PUBLIC'}
                  >
                    <option value="PUBLIC">PUBLIC</option>
                    <option value="PRIVATE">PRIVATE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="event-host">Host</Label>
                  <AvInput id="event-host" type="select" className="form-control" name="host.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="event-participants">Participants</Label>
                  <AvInput
                    id="event-participants"
                    type="select"
                    multiple
                    className="form-control"
                    name="participants"
                    value={eventEntity.participants && eventEntity.participants.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/event" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  eventEntity: storeState.event.entity,
  loading: storeState.event.loading,
  updating: storeState.event.updating,
  updateSuccess: storeState.event.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventUpdate);
