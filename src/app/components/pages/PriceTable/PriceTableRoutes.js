import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const PriceTables = MatxLoadable({
  loader: () => import('./index')
});

const priceTableRoutes = [
  {
    path: '/price-tables',
    component: PriceTables,
    auth: authRoles.admin
  }
];

export default priceTableRoutes;
