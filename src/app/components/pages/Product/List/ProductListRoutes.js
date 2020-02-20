import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const Products = MatxLoadable({
  loader: () => import('./ProductPage')
});

const productListRoutes = [
  {
    path: '/products',
    component: Products,
    auth: authRoles.admin
  }
];

export default productListRoutes;
