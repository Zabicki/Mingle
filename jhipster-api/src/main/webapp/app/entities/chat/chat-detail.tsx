import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getMessages } from './chat.reducer';
import { IChat } from 'app/shared/model/chat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { AvForm, AvInput } from 'availity-reactstrap-validation';

export interface IChatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChatDetail extends React.Component<IChatDetailProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMessages(this.props.match.params.id);
  }

  sendMessage = (event, errors, values)=>{
    const message = values.message;

  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <table>
            {messages && messages.map( (message, i) =>
              <tr key={i}>
                <td>{message.author.login}</td>
                <td>{message.date}</td>
                <td>{message.text}</td>
              </tr>
            )}
        </table>
        <AvForm id="form-control" name="send" onSubmit={this.sendMessage}>
            <div className="form-group">
              <AvInput className="form-control" type="text" name="message"/>
            </div>
            <Button color="primary" id="save-entity" type="submit">
              <FontAwesomeIcon icon="save"/>
              &nbsp; Send
            </Button>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = ({ chat }: IRootState) => ({
  messages: chat.messages
});

const mapDispatchToProps = { getMessages };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatDetail);
