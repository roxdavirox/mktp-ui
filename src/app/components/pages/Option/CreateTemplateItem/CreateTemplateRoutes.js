import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const CreateTemplate = MatxLoadable({
  loader: () => import('./index')
});

const templateRoutes = [
  {
    path: '/templates/create',
    component: CreateTemplate,
    auth: authRoles.admin
  }
];

export default templateRoutes;
