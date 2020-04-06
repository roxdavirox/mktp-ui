import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Prices = MatxLoadable({
  loader: () => import('./index')
});

const priceRoutes = [
  {
    path: '/prices/:id',
    component: Prices,
    auth: authRoles.admin
  }
];

export default priceRoutes;
