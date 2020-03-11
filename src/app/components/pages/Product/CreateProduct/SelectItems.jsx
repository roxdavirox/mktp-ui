/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { compareValues, convertToObjectWithKeys } from 'helpers/array';
import Datatable from './Datatable';
import { getEndpoint } from 'helpers/api';
import { ProductConsumer } from './ProductContext';

const mapItemsWithOptionName = ({ options }) =>
  options
    .map(o => o.items.map(i => ({ optionId: o._id, optionName: o.name, ...i })))
    .reduce((allItems, items) => [...allItems, ...items], []);

const normalizeItems = items =>
  convertToObjectWithKeys(items)('_id')({ isChecked: false });

const SelectItems = () => {
  const { items, setItems } = useContext(ProductConsumer);
  const [sortDirection, setSortDirection] = useState({
    optionName: 'descending',
    name: 'descending'
  });

  useEffect(() => {
    if (Object.values(items).length) return;
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionName)
      .then(normalizeItems)
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
