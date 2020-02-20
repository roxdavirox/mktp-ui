import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Items = MatxLoadable({
  loader: () => import('./index')
});

const optionRoutes = [
  {
    path: '/items',
    component: Items,
    auth: authRoles.admin
  }
];

export default optionRoutes;
