import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductCreate from 'components/pages/Product/CreateProductWizard';
import ProductEditPage from 'components/pages/Product/EditProductWizard';
import ProductListPage from 'components/pages/Product/List/ProductPage';
import Templates from 'components/pages/Product/Template';
import Category from 'components/pages/Category';
import SubCategory from 'components/pages/Category/SubCategory';
import Option from 'components/pages/Option';
import OptionItem from 'components/pages/Option/Item';
import TemplateItem from 'components/pages/Option/TemplateItem';
import PriceTable from 'components/pages/PriceTable';
import Price from 'components/pages/PriceTable/Price';
import TemplateEditor from 'components/pages/Template/TemplateEditorPage';
import LoginPage from 'components/pages/Login';
import ProductTemplates from 'components/pages/Template';
import ProductTemplatePage from './components/pages/productTemplate';

var dashRoutes = [
  {
    collapse: true,
    name: 'Configurações',
    icon: DashboardIcon,
    state: 'configCollapse',
    views: [
      {
        collapse: true,
        name: 'Produtos',
        mini: 'P',
        views: [
          {
            path: '/config/products/create',
            name: 'Novo Produto',
            component: ProductCreate,
            layout: '/admin'
          },
          {
            path: '/config/product-templates',
            name: 'Novo template',
            component: ProductTemplatePage,
            layout: '/admin'
          },
          {
            path: '/config/products/list',
            name: 'Exibir Produtos',
            component: ProductListPage,
            layout: '/admin'
          },
          {
            path: '/config/products/templates',
            name: 'Templates dos produtos',
            component: Templates,
            layout: '/admin'
          }
        ]
      },
      {
        path: '/config/categories',
        name: 'Exibir Categorias',
        mini: 'C',
        component: Category,
        layout: '/admin'
      },
      {
        path: '/config/options',
        name: 'Exibir Opções',
        mini: 'O',
        component: Option,
        layout: '/admin'
      },
      {
        path: '/config/price-table',
        name: 'Exibir Tabelas de preço',
        mini: 'TP',
        layout: '/admin',
        component: PriceTable
      }
    ]
  },
  {
    path: '/config/products/edit',
    name: 'Editar Produto',
    component: ProductEditPage,
    layout: '/admin',
    invisible: true
  },
  {
    path: '/config/option/items',
    name: 'Items',
    mini: '',
    layout: '/admin',
    component: OptionItem,
    invisible: true
  },
  {
    path: '/config/sub-categories',
    name: 'Sub-Categorias',
    mini: '',
    layout: '/admin',
    component: SubCategory,
    invisible: true
  },
  {
    path: '/config/price',
    name: 'Intervalo de preços',
    mini: '',
    layout: '/admin',
    component: Price,
    invisible: true
  },
  {
    path: '/user',
    name: 'Login',
    mini: '',
    layout: '/auth',
    component: LoginPage,
    invisible: true
  },
  {
    path: '/config/templates',
    name: 'Templates',
    mini: '',
    layout: '/admin',
    component: ProductTemplates,
    invisible: true
  },
  {
    path: '/template/create',
    name: 'Editor',
    mini: 'E',
    component: TemplateEditor,
    layout: '/admin',
    invisible: true
  },
  {
    path: '/config/option/template',
    name: 'Template item',
    component: TemplateItem,
    layout: '/admin',
    invisible: true
  }
];

export default dashRoutes;
