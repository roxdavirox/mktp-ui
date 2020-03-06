/* eslint-disable no-console */
import React, { useEffect, useContext, useState } from 'react';
import Container from '@material-ui/core/Container';
import { getEndpoint } from 'helpers/api';
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

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'descending' ? comparison * -1 : comparison;
  };
}

const SelectItems = () => {
  const { items, setItems } = useContext(ProductConsumer);
  const [sortDirection, setSortDirection] = useState({
    optionName: 'descending',
    name: 'descending'
  });

  useEffect(() => {
    if (Object.keys(items).length) return;
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionName)
      .then(converItemsArrayToObject)
      .then(_items => setItems(_items));
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
    const reverseItems = Object.values(items).sort(
      compareValues(column, sortDirection[column])
    );

    setSortDirection(prev => ({
      ...prev,
      [column]: prev[column] === 'descending' ? 'asc' : 'descending'
    }));

    const _items = reverseItems.reduce(
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
