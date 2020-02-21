/* eslint-disable no-console */
import React, { useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { getEndpoint } from 'helpers/api';
import Datatable from './Datatable';
import { ProductConsumer } from './ProductContext';

const mapItemsWithOptionname = ({ options }) =>
  options.map(o =>
    o.items.map(i => ({ optionId: o._id, optionName: o.name, ...i }))
  );

const mapOptionsItems = options =>
  options.reduce((all, item) => [...all, ...item], []);

const mapAllItemsWithCheckedProp = items =>
  items.map(item => ({ ...item, isChecked: false }));

const SelectItems = () => {
  const { items, setItems } = useContext(ProductConsumer);
  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');

    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionname)
      .then(mapOptionsItems)
      .then(mapAllItemsWithCheckedProp)
      .then(_items => setItems(_items));
  }, []);

  const handleCheckItem = index => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <Datatable data={items} onCheckItem={handleCheckItem} />
      </Container>
    </>
  );
};

export default SelectItems;
