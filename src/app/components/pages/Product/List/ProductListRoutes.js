import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Products = MatxLoadable({
  loader: () => import('./index')
});

const productListRoutes = [
  {
    exact: true,
    path: '/products',
    component: Products,
    auth: authRoles.admin
  }
];

export default productListRoutes;
