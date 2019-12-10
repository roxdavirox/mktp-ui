/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint } from 'helpers/api';

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
  const handleChangeSizeX = () => {};
  const handleChangeSizeY = () => {};
  const handleChangeQuantity = () => {};
  const handleUpdate = () => {};

  console.log('item', item);
  return (
    <Container maxWidth="xl">
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
        onChanSizeY={handleChangeSizeY}
        onChangeQuantity={handleChangeQuantity}
      />
    </Container>
  );
};

TemplateItemPage.propTypes = {
  location: PropTypes.object
};

export default TemplateItemPage;
