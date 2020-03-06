/* eslint-disable no-console */
import React, { useEffect, useContext, useState } from 'react';
import Container from '@material-ui/core/Container';
import { getEndpoint } from 'helpers/api';
import { compareValues } from 'helpers/array';
import Datatable from './Datatable';
import { ProductConsumer } from './ProductContext';

const mapItemsWithOptionName = ({ options }) =>
  options
    .map(o => o.items.map(i => ({ optionId: o._id, optionName: o.name, ...i })))
    .reduce((allItems, items) => [...allItems, ...items], []);

const converItemsArrayToObject = items =>
  items.reduce(
    (obj, item) => ({
      ...obj,
      [item._id]: { ...item, isChecked: false }
    }),
    {}
  );

const SelectItems = () => {
  const { items, setItems, productId } = useContext(ProductConsumer);
  const [sortDirection, setSortDirection] = useState({
    optionName: 'descending',
    name: 'descending'
  });
  console.log('productid', productId);
  useEffect(() => {
    if (Object.keys(items).length) return;

    async function getProductItems() {
      const optionsEndpoint = getEndpoint('/options');

      fetch(optionsEndpoint)
        .then(res => res.json())
        .then(mapItemsWithOptionName)
        .then(converItemsArrayToObject)
        .then(async prevItems => {
          const itemsEndpoint = getEndpoint(`/products/${productId}/items`);
          const result = await fetch(itemsEndpoint);
          const data = await result.json();

          const { product } = data;
          const { productOptions } = product;
          const itemsIds = productOptions.map(po => po.item);
          console.log('itemsIds', itemsIds);
          console.log('prevItems', prevItems);
          const checkedItems = Object.values(prevItems).reduce(
            (obj, item) => ({
              ...obj,
              [item._id]: {
                ...item,
                isChecked: itemsIds.indexOf(item._id) !== -1
              }
            }),
            {}
          );
          console.log('checked items', checkedItems);
          return checkedItems;
        })
        .then(setItems);
    }

    getProductItems();
  }, []);

  const handleCheckItem = itemId => {
    setItems(prevItems => ({
      ...prevItems,
      [itemId]: {
        ...prevItems[itemId],
        isChecked: !prevItems[itemId].isChecked
      }
    }));
  };

  const handleSort = column => {
    const sortedItems = Object.values(items).sort(
      compareValues(column, sortDirection[column])
    );

    setSortDirection(prev => ({
      ...prev,
      [column]: prev[column] === 'descending' ? 'asc' : 'descending'
    }));

    const _items = sortedItems.reduce(
      (items, item) => ({
        ...items,
        [item._id]: item
      }),
      {}
    );

    setItems(_items);
  };

  const dataItems = Object.values(items);
  return (
    <>
      <Container maxWidth="xl">
        <Datatable
          data={dataItems}
          onCheckItem={handleCheckItem}
          onSortData={handleSort}
        />
      </Container>
    </>
  );
};

export default SelectItems;
