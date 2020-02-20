/* eslint-disable react/display-name */
import React from 'react';
import { Redirect } from 'react-router-dom';

// core
import optionsRoutes from './components/pages/Option/OptionRoutes';
import itemsRoutes from './components/pages/Option/Item/ItemRoutes';
import priceTableRoutes from './components/pages/PriceTable/PriceTableRoutes';
import priceRoutes from './components/pages/PriceTable/Price/PriceRoutes';
import categoryRoutes from './components/pages/Category/CategoryRoutes';
import subCategoryRoutes from './components/pages/Category/SubCategory/SubCategoryRoutes';

import dashboardRoutes from './views/dashboard/DashboardRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';
// import utilitiesRoutes from './views/utilities/UtilitiesRoutes';

// import materialRoutes from './views/material-kit/MaterialRoutes';
// import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute';

// import formsRoutes from './views/forms/FormsRoutes';
// import mapRoutes from './views/map/MapRoutes';

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
  // core routes
  ...optionsRoutes,
  ...itemsRoutes,
  ...priceTableRoutes,
  ...priceRoutes,
  ...categoryRoutes,
  ...subCategoryRoutes,
  // theme routes
  ...dashboardRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...errorRoute
  // examples
  // ...materialRoutes,
  // ...utilitiesRoutes,
  // ...dragAndDropRoute,
  // ...formsRoutes,
  // ...mapRoutes
];

export default routes;
