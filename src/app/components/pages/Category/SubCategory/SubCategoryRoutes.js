import { MatxLoadable } from 'matx';
import { authRoles } from 'app/auth/authRoles';

const SubCategories = MatxLoadable({
  loader: () => import('./index')
});

const subCategoryRoutes = [
  {
    path: '/sub-categories',
    component: SubCategories,
    auth: authRoles.admin
  }
];

export default subCategoryRoutes;
