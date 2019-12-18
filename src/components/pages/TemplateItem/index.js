/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TemplateDatatable from './Datatable';
import { getEndpoint, createPostRequest } from 'helpers/api';

const TemplateItems = () => {
  const [total, setTotal] = useState(0);
  const [templateItems, setTemplateItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [selectedOption, setOptionSelected] = useState('0');

  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const endpoint = getEndpoint('/items/templates');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ items }) => setTemplateItems(items))
      .catch(error => {
        console.log(`Error on get template items ${error}`);
      });
  }, []);

  const calculateTotal = () => {};

  const handleSubmit = () => {
    const optionId = selectedOption._id;
    const options = templateItems.map(item => ({
      option: item.option._id,
      item: item._id,
      quantity: item.quantity,
      size: item.size || undefined
    }));

    const endpoint = getEndpoint(`/items/templates/${optionId}`);

    const postRequest = createPostRequest({ name: templateName, options });
    fetch(endpoint, postRequest)
      .then(res => res.json())
      .then(res => console.log('create template response:', res));
  };
  console.log('options', options);
  return (
    <Container maxWidth="xl">
      <TemplateDatatable templateItems={templateItems} />
    </Container>
  );
};

export default TemplateItems;
