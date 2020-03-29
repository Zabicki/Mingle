import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './chat.reducer';
import { IChat } from 'app/shared/model/chat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Chat extends React.Component<IChatProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { chatList, match } = this.props;
    return (
      <div>
        <h2 id="chat-heading">
          Chats
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Chat
          </Link>
        </h2>
        <div className="table-responsive">
          {chatList && chatList.length > 0 ? (
            <Table responsive aria-describedby="chat-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Chats</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {chatList.map((chat, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${chat.id}`} color="link" size="sm">
                        {chat.id}
                      </Button>
                    </td>
                    <td>
                      {chat.chats
                        ? chat.chats.map((val, j) => (
                            <span key={j}>
                              {val.id}
                              {j === chat.chats.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${chat.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${chat.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${chat.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Chats found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chat }: IRootState) => ({
  chatList: chat.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
