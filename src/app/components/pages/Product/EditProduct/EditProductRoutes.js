import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const CreateProduct = MatxLoadable({
  loader: () => import('./index')
});

const editProductRoutes = [
  {
    exact: true,
    path: '/products/edit',
    component: CreateProduct,
    auth: authRoles.admin
  }
];

export default editProductRoutes;
