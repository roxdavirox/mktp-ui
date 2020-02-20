import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const SubCategories = MatxLoadable({
  loader: () => import('./index')
});

const subCategoryRoutes = [
  {
    path: '/subcategories',
    component: SubCategories,
    auth: authRoles.admin
  }
];

export default subCategoryRoutes;
