/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TemplateDatatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint, createPostRequest } from 'helpers/api';

const TemplateItems = () => {
  const [total, setTotal] = useState(0);
  const [templateItems, setTemplateItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [selectedOption, setOptionSelected] = useState('0');

  useEffect(() => {
    const endpoint = getEndpoint('/options');
    fetch(endpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const endpoint = getEndpoint('/items/templates');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ items }) => {
        const _items = items
          .map(item => {
            if (item.priceTable && item.priceTable.unit === 'quantidade') {
              return item;
            } else {
              return { ...item, size: { x: 1, y: 1 } };
            }
          })
          .map(item => ({ ...item, price: 0, quantity: 1, isChecked: false }));
        setTemplateItems(_items);
      })
      .catch(error => {
        console.log(`Error on get template items ${error}`);
      });
  }, []);

  const handleChangeItemPrice = (index, price) => {
    templateItems[index] = { ...templateItems[index], price };
    setTemplateItems([...templateItems]);
  };

  const handleCalculateTotal = (index, templateItem) => {
    const { priceTable, quantity, size, itemType, isChecked } = templateItem;
    if (!isChecked) {
      handleChangeItemPrice(index, 0);
      return;
    }

    if (itemType === 'template') {
      handleChangeItemPrice(index, templateItem.price * quantity);
      return;
    }

    const { _id: priceTableId } = priceTable;
    const endpoint = getEndpoint(`/price-tables/total/${priceTableId}`);

    const body = {
      quantity,
      size
    };

    const request = createPostRequest(body);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ total }) => handleChangeItemPrice(index, total))
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  };

  const handleChangeValueX = () => {};
  const handleChangeValueY = () => {};
  const handleDuplicate = () => {};
  const handleCheck = () => {};
  const reduceTotalPrice = () => total;
  const handleNameChange = newName => setTemplateName(newName);

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
  const _total = reduceTotalPrice();
  console.log('total', _total);

  return (
    <>
      <Container maxWidth="xl">
        <TemplateDatatable
          title={
            <InfoItem
              options={options}
              selectedOption={selectedOption}
              onNameChange={handleNameChange}
              onSelectOption={setOptionSelected}
            />
          }
          templateItems={templateItems}
          onCalculateTotal={handleCalculateTotal}
          onChangeValueX={handleChangeValueX}
          onChangeValueY={handleChangeValueY}
          onDuplicateItem={handleDuplicate}
          onCheckItem={handleCheck}
        />
      </Container>
      <br />
      <Container maxWidth="xl">
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ float: 'right' }}
          color="primary"
        >
          Criar template
        </Button>
      </Container>
    </>
  );
};

export default TemplateItems;
