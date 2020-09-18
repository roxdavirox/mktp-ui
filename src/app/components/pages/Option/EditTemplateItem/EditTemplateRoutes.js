import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const EditTemplate = MatxLoadable({
  loader: () => import('./index')
});

const templateRoutes = [
  {
    path: '/templates/edit',
    component: EditTemplate,
    auth: authRoles.admin
  }
];

export default templateRoutes;
