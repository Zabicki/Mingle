import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chat.reducer';
import { IChat } from 'app/shared/model/chat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChatDetail extends React.Component<IChatDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chatEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Chat [<b>{chatEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>Chats</dt>
            <dd>
              {chatEntity.chats
                ? chatEntity.chats.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === chatEntity.chats.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
          </dl>
          <Button tag={Link} to="/chat" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/chat/${chatEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ chat }: IRootState) => ({
  chatEntity: chat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatDetail);
