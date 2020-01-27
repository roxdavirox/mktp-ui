/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import InfoItem from './InfoItem';
import Button from '@material-ui/core/Button';
import { getEndpoint, createPostRequest } from 'helpers/api';

const mapSizeItem = item => {
  if (item.priceTable && item.priceTable.unit === 'quantidade') {
    return item;
  } else {
    return { ...item, size: { x: 1, y: 1 } };
  }
};

const convertIdToItemId = ({ _id: itemId, ...rest }) => ({ itemId, ...rest });

const mapDefaultItemInfos = item => ({
  ...item,
  price: 0,
  quantity: 1,
  isChecked: false
});

const getTemplateItems = async () => {
  const endpoint = getEndpoint('/items/templates');
  const response = await fetch(endpoint);
  const { items } = await response.json();
  const _templateItems = items
    .map(convertIdToItemId)
    .map(mapSizeItem)
    .map(mapDefaultItemInfos);

  return _templateItems;
};

const TemplateItemPage = ({ location }) => {
  const { itemId } = location.state;
  const [item, setItem] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectOption] = useState('0');
  const [templateName, setTemplateName] = useState('');
  const [templateItems, setTemplateItems] = useState([]);

  useEffect(() => {
    async function AsyncGetTemplateItems() {
      const _templateItems = await getTemplateItems();
      const itemsEndpoint = getEndpoint(`/items/${itemId}`);
      fetch(itemsEndpoint)
        .then(res => res.json())
        .then(({ item }) => {
          setItem(item);
          setTemplateName(item.name);
          setSelectOption(item.option._id);
          return item;
        })
        .then(item => {
          const { templates } = item;
          console.log('item templates', templates);
          const checkedTemplates = templates.map(t => ({
            ...t.item,
            ...t,
            isChecked: true
          }));
          console.log('checkedTemplates', checkedTemplates);
          setTemplateItems([...checkedTemplates, ..._templateItems]);
        })
        .catch(e => console.log(e));
    }
    AsyncGetTemplateItems();
  }, []);

  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  const handleDeleteTemplateItems = indexRows => {
    const _templateItems = templateItems.filter(
      (_, index) => indexRows.indexOf(index) === -1
    );
    setTemplateItems([..._templateItems]);
  };

  const handleDuplicateItem = rowIndex => {
    templateItems.splice(rowIndex + 1, 0, { ...templateItems[rowIndex] });
    setTemplateItems([...templateItems]);
  };

  const handleCheckItem = (rowIndex, isChecked) => {
    const templateItem = { ...templateItems[rowIndex], isChecked };
    templateItems[rowIndex] = templateItem;
    handleCalculateTotal(rowIndex, templateItem, isChecked);
  };

  const handleSelectOption = e => setSelectOption(e.target.value);

  const handleChangeTemplateName = e => setTemplateName(e.target.value);

  const handleChangeSizeX = (rowIndex, valueX) => {
    const templateItem = {
      ...templateItems[rowIndex],
      size: {
        ...templateItems[rowIndex].size,
        x: valueX
      }
    };
    templateItems[rowIndex] = templateItem;
    handleCalculateTotal(rowIndex, templateItem, templateItem.isChecked);
  };

  const handleChangeSizeY = (rowIndex, valueY) => {
    const templateItem = {
      ...templateItems[rowIndex],
      size: {
        ...templateItems[rowIndex].size,
        y: valueY
      }
    };
    templateItems[rowIndex] = templateItem;
    handleCalculateTotal(rowIndex, templateItem, templateItem.isChecked);
  };

  const handleChangeQuantity = (rowIndex, quantity) => {
    const templateItem = { ...templateItems[rowIndex], quantity };
    templateItems[rowIndex] = templateItem;
    handleCalculateTotal(rowIndex, templateItem, templateItem.isChecked);
  };

  const handleSubmit = () => {};

  const calculateTotal = () => {
    const totalTemplates = templateItems
      .filter(tp => tp.isChecked)
      .filter(tp => tp.itemType === 'template')
      .reduce((acc, tp) => acc + tp.itemPrice * tp.quantity, 0);

    const totalItems = templateItems
      .filter(tp => tp.isChecked)
      .filter(tp => tp.itemType === 'item')
      .reduce((acc, tp) => acc + tp.itemPrice, 0);

    return totalTemplates + totalItems;
  };

  const handleCalculateTotal = (rowIndex, templateItem, isChecked) => {
    const { quantity, size } = templateItem;
    console.log('templateItem', templateItem);
    if (!isChecked) {
      // templateItems[rowIndex].itemPrice = 0;
      setTemplateItems([...templateItems]);
      return;
    }

    const { priceTable, itemType } = templateItem;
    if (itemType === 'template') {
      templateItems[rowIndex] = { ...templateItems[rowIndex], quantity };
      setTemplateItems([...templateItems]);
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
      .then(({ total }) => {
        templateItems[rowIndex].itemPrice = total;
        setTemplateItems([...templateItems]);
        return total;
      })
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  };
  const total = calculateTotal();

  console.log('templates: ', templateItems);
  return (
    <>
      <Container maxWidth="xl">
        <p>Total: {total}</p>
        <Datatable
          title={
            <InfoItem
              options={options}
              onChangeSelectOption={handleSelectOption}
              onNameChange={handleChangeTemplateName}
              selectedOption={selectedOption}
              templateName={templateName}
            />
          }
          data={templateItems}
          onDeleteTemplateItems={handleDeleteTemplateItems}
          onDuplicateItem={handleDuplicateItem}
          onCheckItem={handleCheckItem}
          onChangeSizeX={handleChangeSizeX}
          onChangeSizeY={handleChangeSizeY}
          onChangeQuantity={handleChangeQuantity}
          onCalculateTotal={handleCalculateTotal}
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
          Atualizar
        </Button>
      </Container>
    </>
  );
};

TemplateItemPage.propTypes = {
  location: PropTypes.object
};

export default TemplateItemPage;
