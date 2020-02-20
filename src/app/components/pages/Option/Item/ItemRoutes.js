import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Items = MatxLoadable({
  loader: () => import('./index')
});

const itemRoutes = [
  {
    path: '/items',
    component: Items,
    auth: authRoles.admin
  }
];

export default itemRoutes;
