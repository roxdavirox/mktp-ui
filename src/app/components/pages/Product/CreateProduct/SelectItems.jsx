/* eslint-disable no-console */
import React, { useEffect, useContext } from 'react';
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
    (obj, item, index) => ({
      ...obj,
      [item._id]: { ...item, index, isChecked: false }
    }),
    {}
  );

const SelectItems = () => {
  const { items, setItems } = useContext(ProductConsumer);

  useEffect(() => {
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

  const handleSort = direction => {
    if (direction === 'descending') {
      const _items = Object.values(items);
      let itemsLength = _items.length;

      const descItems = _items.reduce(
        (obj, item, index) => ({
          ...obj,
          [item._id]: { ...item, index: itemsLength - index - 1 }
        }),
        {}
      );
      console.table(descItems);
      setItems(descItems);
      return;
    }

    const _items = Object.values(items);

    const ascItems = _items.reduce(
      (obj, item, index) => ({
        ...obj,
        [item._id]: { ...item, index }
      }),
      {}
    );
    setItems(ascItems);
  };

  const dataItems = Object.values(items).sort((a, b) => a.index - b.index);
  console.table(dataItems);
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
