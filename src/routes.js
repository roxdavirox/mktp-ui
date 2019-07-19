import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductCreate from 'components/product/Page.jsx';
import ProductList from 'components/product/ProductList.jsx';
import Templates from 'components/product/Template/Templates.jsx';
import Category from 'components/category/Page.jsx';
import SubCategory from 'components/category/subCategory/Page.jsx';
import Option from 'components/option/Page.jsx';
import Item from 'components/item/Page.jsx';
import OptionItem from 'components/option/item/Page.jsx';
import PriceTable from 'components/priceTable/Page.jsx';
import Price from 'components/priceTable/price/Page.jsx';
import TemplateEditor from 'components/template/TemplateEditor.jsx';
import LoginPage from 'components/Login/Page.jsx';
import ProductTemplates from 'components/template/Page.jsx';

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
            path: '/config/products/list',
            name: 'Opções',
            component: ProductList,
            layout: '/admin'
          },
          {
            path: '/config/products/templates',
            name: 'Templates',
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
        path: '/config/items',
        name: 'Itens',
        mini: 'I',
        component: Item,
        layout: '/admin',
        invisible: false
      },
      {
        path: '/config/price-table',
        name: 'Tabelas de preços',
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
