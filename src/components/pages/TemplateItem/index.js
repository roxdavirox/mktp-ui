/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TemplateDatatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint, createPostRequest } from 'helpers/api';

const TemplateItems = () => {
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

  const handleChangeItemPrice = (index, price, templateItem) => {
    templateItems[index] = { ...templateItem, price };
    setTemplateItems([...templateItems]);
  };

  const handleCalculateItemPrice = (index, templateItem) => {
    const { priceTable, quantity, size, itemType, isChecked } = templateItem;
    if (!isChecked) {
      handleChangeItemPrice(index, 0, templateItem);
      return;
    }

    if (itemType === 'template') {
      handleChangeItemPrice(
        index,
        templateItem.templatePrice * quantity,
        templateItem
      );
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
      .then(({ total }) => handleChangeItemPrice(index, total, templateItem))
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  };

  const handleChangeSizeX = (rowIndex, valueX) => {
    const templateItem = {
      ...templateItems[rowIndex],
      size: {
        ...templateItems[rowIndex].size,
        x: valueX
      }
    };
    handleCalculateItemPrice(rowIndex, templateItem);
  };

  const handleChangeSizeY = (rowIndex, valueY) => {
    const templateItem = {
      ...templateItems[rowIndex],
      size: {
        ...templateItems[rowIndex].size,
        y: valueY
      }
    };
    handleCalculateItemPrice(rowIndex, templateItem);
  };

  const handleDuplicate = () => {};

  const handleCheck = (index, isChecked) => {
    templateItems[index] = { ...templateItems[index], isChecked };
    const templateItem = templateItems[index];
    handleCalculateItemPrice(index, templateItem);
  };

  const reduceTotalPrice = () =>
    templateItems
      .filter(item => item.isChecked)
      .reduce((total, item) => total + item.price, 0);

  const handleNameChange = newName => setTemplateName(newName);

  const handleChangeQuantity = (index, quantity) => {
    templateItems[index] = { ...templateItems[index], quantity };
    const templateItem = templateItems[index];
    handleCalculateItemPrice(index, templateItem);
  };

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
  const total = reduceTotalPrice();
  console.log('total', total);

  return (
    <>
      <Container maxWidth="xl">
        <p>Total: {total}</p>
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
          onChangeValueX={handleChangeSizeX}
          onChangeValueY={handleChangeSizeY}
          onDuplicateItem={handleDuplicate}
          onCheckItem={handleCheck}
          onChangeQuantity={handleChangeQuantity}
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
