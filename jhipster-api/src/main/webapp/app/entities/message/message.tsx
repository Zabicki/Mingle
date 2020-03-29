import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './message.reducer';
import { IMessage } from 'app/shared/model/message.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMessageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Message extends React.Component<IMessageProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { messageList, match } = this.props;
    return (
      <div>
        <h2 id="message-heading">
          Messages
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Message
          </Link>
        </h2>
        <div className="table-responsive">
          {messageList && messageList.length > 0 ? (
            <Table responsive aria-describedby="message-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>User</th>
                  <th>Messages</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {messageList.map((message, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${message.id}`} color="link" size="sm">
                        {message.id}
                      </Button>
                    </td>
                    <td>{message.message}</td>
                    <td>
                      <TextFormat type="date" value={message.date} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{message.user ? message.user.id : ''}</td>
                    <td>{message.messages ? <Link to={`chat/${message.messages.id}`}>{message.messages.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${message.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${message.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${message.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Messages found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ message }: IRootState) => ({
  messageList: message.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
