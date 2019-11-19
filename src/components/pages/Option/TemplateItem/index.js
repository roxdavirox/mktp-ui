/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getEndpoint } from 'helpers/api';

const TemplateItemPage = ({ location }) => {
  const { itemId } = location.state;
  const [item, setItem] = useState({});
  console.log('itemId', itemId);
  useEffect(() => {
    const endpoint = getEndpoint(`/items/${itemId}`);
    fetch(endpoint)
      .then(res => res.json())
      .then(({ item }) => setItem(item))
      .catch(e => console.log(e));
  }, []);
  console.log('item', item);
  return (
    item.templateOptions !== undefined &&
    item.templateOptions.map((template, key) => (
      <p key={key}>{template.item.name}</p>
    ))
  );
};

export default TemplateItemPage;
