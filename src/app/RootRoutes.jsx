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
import productRoutes from './components/pages/Product/List/ProductListRoutes';
import createProductRoutes from './components/pages/Product/CreateProduct/CreateProductRoutes';
import editProductRoutes from './components/pages/Product/EditProduct/EditProductRoutes';
import createTemplateRoutes from './components/pages/Option/TemplateItem/Create/CreateTemplateRoutes';
import editTemplateRoutes from './components/pages/Option/TemplateItem/Edit/EditTemplateRoutes';
import dashboardRoutes from './views/dashboard/DashboardRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';

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
  ...productRoutes,
  ...createProductRoutes,
  ...editProductRoutes,
  ...createTemplateRoutes,
  ...editTemplateRoutes,
  // theme routes
  ...dashboardRoutes,
  ...sessionRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
