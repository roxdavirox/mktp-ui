/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint, createPostRequest } from 'helpers/api';

const TemplateItemPage = ({ location }) => {
  const { itemId } = location.state;
  const [item, setItem] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectOption] = useState('0');
  const [templateName, setTemplateName] = useState('');
  const [templateItems, setTemplateItems] = useState([]);

  console.log('itemId', itemId);
  useEffect(() => {
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
        const checkedTemplates = templates.map(t => ({
          ...t,
          isChecked: true
        }));
        setTemplateItems(checkedTemplates);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  const handleDeleteTemplateItems = () => {};
  const handleDuplicateItem = () => {};
  const handleCheckItem = () => {};
  const handleSelectOption = () => {};
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
  const handleUpdate = () => {};

  const calculateTotal = () => {
    const totalTemplates = templateItems
      .filter(tp => tp.item.itemType === 'template')
      .reduce((acc, tp) => acc + tp.itemPrice * tp.quantity, 0);

    const totalItems = templateItems
      .filter(tp => tp.item.itemType === 'item')
      .reduce((acc, tp) => acc + tp.itemPrice, 0);

    return totalTemplates + totalItems;
  };

  const handleCalculateTotal = (rowIndex, templateItem, isChecked) => {
    const { item, quantity, size } = templateItem;
    console.log('templateItem', templateItem);
    console.log('item', item);
    if (!isChecked) {
      templateItems[rowIndex].itemPrice = 0;
      setTemplateItems([...templateItems]);
      return;
    }

    const { priceTableId: priceTable, itemType } = item;
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

  console.log('templates', templateItems);
  const total = calculateTotal();
  return (
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
  );
};

TemplateItemPage.propTypes = {
  location: PropTypes.object
};

export default TemplateItemPage;
