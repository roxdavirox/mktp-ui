/* eslint-disable react/display-name */
import React from 'react';
import { Redirect } from 'react-router-dom';

import optionsRoutes from './components/pages/Option/OptionRoutes';

import dashboardRoutes from './views/dashboard/DashboardRoutes';
import utilitiesRoutes from './views/utilities/UtilitiesRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';

import materialRoutes from './views/material-kit/MaterialRoutes';
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute';

import formsRoutes from './views/forms/FormsRoutes';
import mapRoutes from './views/map/MapRoutes';

const redirectRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/analytics" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...optionsRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  ...dragAndDropRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
