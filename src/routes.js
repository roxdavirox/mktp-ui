import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductCreate from 'base/components/product/Page.jsx';
import ProductList from 'base/components/product/ProductList.jsx';
import Category from 'base/components/category/Page.jsx';
import SubCategory from 'base/components/category/subCategory/Page.jsx';
import Option from 'base/components/option/Page.jsx';
import Item from 'base/components/item/Page.jsx';
import OptionItem from 'base/components/option/item/Page.jsx';
import PriceTable from 'base/components/priceTable/Page.jsx';
import Price from 'base/components/priceTable/price/Page.jsx';

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
            name: 'Listar Produtos',
            component: ProductList,
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
  }
];

export default dashRoutes;
