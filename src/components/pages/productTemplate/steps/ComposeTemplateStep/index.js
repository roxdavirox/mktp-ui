/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import { getEndpoint } from 'helpers/api';

const TemplateContainer = () => {
  const [options, setOptions] = useState([]);
  const [items, setTemplateItems] = useState([]);
  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const templateItemsEndpoint = getEndpoint('/items/templates');
    fetch(templateItemsEndpoint)
      .then(res => res.json())
      .then(({ items }) => setTemplateItems(items))
      .catch(e => console.log('erro:', e));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        {/* <InfoItem options={options} /> */}
        <Datatable dataOptions={options} dataItems={items} />
      </Container>
    </>
  );
};

export default TemplateContainer;
