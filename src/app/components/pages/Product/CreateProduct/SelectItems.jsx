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
    (obj, item) => ({
      ...obj,
      [item._id]: { ...item, isChecked: false }
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

  const dataItems = Object.values(items);
  return (
    <>
      <Container maxWidth="xl">
        <Datatable data={dataItems} onCheckItem={handleCheckItem} />
      </Container>
    </>
  );
};

export default SelectItems;
