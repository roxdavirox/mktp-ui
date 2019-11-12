import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductCreate from 'components/pages/Product';
import ProductList from 'components/pages/Product/ProductListPage';
import Templates from 'components/pages/Product/Template';
import Category from 'components/pages/Category';
import SubCategory from 'components/pages/Category/SubCategory';
import Option from 'components/pages/Option';
import OptionItem from 'components/pages/Option/Item';
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
            name: 'Criar Produto',
            component: ProductCreate,
            layout: '/admin'
          },
          {
            path: '/config/product-templates',
            name: 'Criar template',
            component: ProductTemplatePage,
            layout: '/admin'
          },
          {
            path: '/config/products/list',
            name: 'Opções detalhadas',
            component: ProductList,
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
        name: 'Categorias',
        mini: 'C',
        component: Category,
        layout: '/admin'
      },
      {
        path: '/config/options',
        name: 'Opções',
        mini: 'O',
        component: Option,
        layout: '/admin'
      },
      {
        path: '/config/price-table',
        name: 'Tabelas de preço',
        mini: 'TP',
        layout: '/admin',
        component: PriceTable
      }
    ]
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
  }
];

export default dashRoutes;
