import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Categories = MatxLoadable({
  loader: () => import('./index')
});

const categoryRoutes = [
  {
    path: '/categories',
    component: Categories,
    auth: authRoles.admin
  }
];

export default categoryRoutes;
