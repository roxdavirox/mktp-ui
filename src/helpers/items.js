import { convertToObjectWithKeys, addNewPropsWhen } from './array';
import reactUuid from 'react-uuid';

const defaulItemProps = {
  price: 0,
  quantity: 1,
  isChecked: false
};

export const itemNotHasQuantity = item =>
  !(item.priceTable && item.priceTable.unit === 'quantidade');

export const normalizeWithDefaultProps = items => {
  const itemsWithSize = addNewPropsWhen(itemNotHasQuantity)({
    size: { x: 1, y: 1 }
  })(items);
  const itemsWithUuid = itemsWithSize.map(i => ({ ...i, uuid: reactUuid() }));
  return convertToObjectWithKeys(itemsWithUuid)('uuid')(defaulItemProps);
};

export const normalizeCheckedItems = items => {
  const itemsWithUuid = items.map(i => ({ ...i, uuid: reactUuid() }));
  return convertToObjectWithKeys(itemsWithUuid)('uuid')();
};
