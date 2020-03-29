import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Favourites from './favourites';
import FavouritesDetail from './favourites-detail';
import FavouritesUpdate from './favourites-update';
import FavouritesDeleteDialog from './favourites-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FavouritesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FavouritesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FavouritesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Favourites} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FavouritesDeleteDialog} />
  </>
);

export default Routes;
