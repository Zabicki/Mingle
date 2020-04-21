import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEventState = IPaginationBaseState;

export class Event extends React.Component<IEventProps, IEventState> {
  state: IEventState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { eventList, match } = this.props;
    return (
      <div>
        <h2 id="event-heading">
          Events
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Event
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {eventList && eventList.length > 0 ? (
              <Table responsive aria-describedby="event-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      ID <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('name')}>
                      Name <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('description')}>
                      Description <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('picture')}>
                      Picture <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('city')}>
                      City <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('address')}>
                      Address <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('location')}>
                      Location <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('maxParticipants')}>
                      Max Participants <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('date')}>
                      Date <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('recurrent')}>
                      Recurrent <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('interval')}>
                      Interval <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('category')}>
                      Category <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('privacy')}>
                      Privacy <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      Host <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {eventList.map((event, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${event.id}`} color="link" size="sm">
                          {event.id}
                        </Button>
                      </td>
                      <td>{event.name}</td>
                      <td>{event.description}</td>
                      <td>
                        {event.picture ? (
                          <div>
                            <a onClick={openFile(event.pictureContentType, event.picture)}>
                              <img src={`data:${event.pictureContentType};base64,${event.picture}`} style={{ maxHeight: '30px' }} />
                              &nbsp;
                            </a>
                            <span>
                              {event.pictureContentType}, {byteSize(event.picture)}
                            </span>
                          </div>
                        ) : null}
                      </td>
                      <td>{event.city}</td>
                      <td>{event.address}</td>
                      <td>{event.location}</td>
                      <td>{event.maxParticipants}</td>
                      <td>
                        <TextFormat type="date" value={event.date} format={APP_LOCAL_DATE_FORMAT} />
                      </td>
                      <td>{event.recurrent ? 'true' : 'false'}</td>
                      <td>{event.interval}</td>
                      <td>{event.category}</td>
                      <td>{event.privacy}</td>
                      <td>{event.host ? event.host.id : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${event.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${event.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${event.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">No Events found</div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities,
  totalItems: event.totalItems,
  links: event.links,
  entity: event.entity,
  updateSuccess: event.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
