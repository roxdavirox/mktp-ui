import DashboardIcon from '@material-ui/icons/Dashboard';
import Option from 'base/components/option/Page.jsx';
import Item from 'base/components/item/Container.jsx';
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
    path: '/config/price',
    name: 'Intervalo de preços',
    mini: '',
    layout: '/admin',
    component: Price,
    invisible: true
  }
];

export default dashRoutes;
