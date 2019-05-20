import DashboardIcon from '@material-ui/icons/Dashboard';
import Option from 'base/components/option/Page.jsx';
import Item from 'base/components/item/Page.jsx';
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
      }
    ]
  }
];
export default dashRoutes;
