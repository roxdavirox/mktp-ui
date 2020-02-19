import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Options = MatxLoadable({
  loader: () => import('./index')
});

const optionRoutes = [
  {
    path: '/option/',
    component: Options,
    auth: authRoles.admin
  }
];

export default optionRoutes;
