import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chat from './chat';
import Favourites from './favourites';
import Message from './message';
import Review from './review';
import Event from './event';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}chat`} component={Chat} />
      <ErrorBoundaryRoute path={`${match.url}favourites`} component={Favourites} />
      <ErrorBoundaryRoute path={`${match.url}message`} component={Message} />
      <ErrorBoundaryRoute path={`${match.url}review`} component={Review} />
      <ErrorBoundaryRoute path={`${match.url}event`} component={Event} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
