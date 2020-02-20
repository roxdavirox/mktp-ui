import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './LayoutReducer';
import ScrumBoardReducer from './ScrumBoardReducer';
import NotificationReducer from './NotificationReducer';
import EcommerceReducer from './EcommerceReducer';
import options from './Option.reducer';
import items from './Item.reducer';
import priceTables from './PriceTable.reducer';
import prices from './Price.reducer';
import categories from './Category.reducer';

const RootReducer = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories,
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer
});

export default RootReducer;
