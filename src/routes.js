import DashboardIcon from '@material-ui/icons/Dashboard';
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
        path: '/config/options',
        name: 'Opções',
        mini: 'O',
        component: Option,
        layout: '/admin'
      },
      {
        path: '/config/item',
        name: 'Item',
        mini: 'I',
        component: Item,
        layout: '/admin',
        invisible: false
      },
      {
        path: '/config/price-table',
        name: 'Tabela de preço',
        mini: 'TP',
        layout: '/admin',
        component: PriceTable
      }
    ]
  },
  {
    path: '/config/option/item',
    name: 'Items',
    mini: '',
    layout: '/admin',
    component: OptionItem,
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
