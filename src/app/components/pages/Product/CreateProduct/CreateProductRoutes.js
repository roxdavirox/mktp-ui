import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const CreateProduct = MatxLoadable({
  loader: () => import('./index')
});

const createProductRoutes = [
  {
    exact: true,
    path: '/products/create',
    component: CreateProduct,
    auth: authRoles.admin
  }
];

export default createProductRoutes;
