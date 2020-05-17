import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chat from './chat';
import ChatDetail from './chat-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChatDetail} />
      <ErrorBoundaryRoute path={match.url} component={Chat} />
    </Switch>
  </>
);

export default Routes;
