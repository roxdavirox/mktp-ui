/* eslint-disable no-console */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import history from 'history.js';
import { convertToObjectWithKeys, addNewPropsWhen } from 'helpers/array';

import { Breadcrumb } from 'matx';
import TemplateDatatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint, createPostRequest } from 'helpers/api';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';

const defaulItemProps = {
  price: 0,
  quantity: 1,
  isChecked: false
};

const itemNotHasQuantity = item =>
  !(item.priceTable && item.priceTable.unit === 'quantidade');

const mapDefaultItemPropsToObject = items => {
  const itemsWithSize = addNewPropsWhen(itemNotHasQuantity)({
    size: { x: 1, y: 1 }
  })(items);

  return convertToObjectWithKeys(itemsWithSize)('_id')(defaulItemProps);
};

const convertObjectToArray = obj => Object.values(obj);

const TemplateItems = ({ enqueueSnackbar, ...props }) => {
  const [total, setTotal] = useState(0);
  const [isLoading, setLoadingState] = useState(true);
  const [templateItems, setTemplateItems] = useState([]);
  const [templateName, setTemplateName] = useState('');
  // eslint-disable-next-line react/prop-types
  const { optionId } = props.location.state;

  useEffect(() => {
    async function AsyncGetTemplateItems() {
      const endpoint = getEndpoint('/items/templates');

      fetch(endpoint)
        .then(res => res.json())
        .then(({ items }) => {
          const objectItems = mapDefaultItemPropsToObject(items);
          setTemplateItems(objectItems);
          setLoadingState(false);
        })
        .catch(error => {
          console.log(`Error on get template items ${error}`);
        });
    }
    AsyncGetTemplateItems();
  }, []);

  useEffect(() => {
    handleTotalPriceCalculate();
  }, [templateItems]);

  const handleChangeItemPrice = (id, price) => {
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: { ...prevItems[id], price }
    }));
  };

  const calculateTemplatePrice = id => {
    const { quantity } = templateItems[id];
    const newPrice = templateItems[id].price * quantity;
    handleChangeItemPrice(id, newPrice);
  };

  const calculateItemPrice = (id, quantity, size = { x: 1, y: 1 }) => {
    const { priceTable } = templateItems[id];

    if (!priceTable) return;
    const { _id: priceTableId } = priceTable;
    const endpoint = getEndpoint(`/price-tables/total/${priceTableId}`);

    const body = {
      quantity,
      size
    };

    const request = createPostRequest(body);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ total }) => handleChangeItemPrice(id, total))
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  };

  const handleCalculateItemPrice = (
    id,
    quantity = 1,
    size = { x: 1, y: 1 }
  ) => {
    const { itemType } = templateItems[id];

    if (itemType === 'item') {
      calculateItemPrice(id, quantity, size);
      return;
    }

    calculateTemplatePrice(id);
  };

  const handleChangeSizeX = (id, valueX) => {
    const templateItem = templateItems[id];
    const { isChecked } = templateItem;
    if (!isChecked) return;
    const {
      quantity,
      size: { y }
    } = templateItem;
    const newSize = {
      y,
      x: valueX
    };
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: {
        ...templateItem,
        size: newSize
      }
    }));
    handleCalculateItemPrice(id, quantity, newSize);
  };

  const handleChangeSizeY = (id, valueY) => {
    const templateItem = templateItems[id];
    const { isChecked } = templateItem;
    if (!isChecked) return;
    const {
      quantity,
      size: { x }
    } = templateItem;
    const newSize = {
      x,
      y: valueY
    };
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: {
        ...templateItem,
        size: newSize
      }
    }));
    handleCalculateItemPrice(id, quantity, newSize);
  };

  const handleDuplicate = () => {};

  const handleCheck = id => {
    const { isChecked, quantity } = templateItems[id];

    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: {
        ...prevItems[id],
        isChecked: !isChecked
      }
    }));

    if (isChecked) {
      handleChangeItemPrice(id, 0);
      return;
    }

    handleCalculateItemPrice(id, quantity);
  };

  const handleTotalPriceCalculate = () => {
    const checkedItems = convertObjectToArray(templateItems).filter(
      item => item.isChecked
    );

    const totalItemPrice = checkedItems
      .filter(i => i.itemType === 'item')
      .reduce((_total, item) => _total + item.price, 0);

    const totalTemplateItemPrice = checkedItems
      .filter(i => i.itemType === 'template')
      .reduce(
        (_total, templateItem) =>
          _total + templateItem.price * templateItem.quantity,
        0
      );

    const _total = totalItemPrice + totalTemplateItemPrice;
    setTotal(_total);
  };

  const handleNameChange = newName => setTemplateName(newName);

  const handleChangeQuantity = (id, quantity) => {
    const { isChecked } = templateItems[id];
    if (!isChecked) return;
    console.log('change qty', id, quantity);
    if (quantity < 1) return;
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: {
        ...prevItems[id],
        quantity
      }
    }));
    console.log('wtf');
    handleCalculateItemPrice(id, quantity);
  };

  const handleDeleteTemplateItems = indexRows => {
    const _templateItems = templateItems.filter(
      (_, index) => indexRows.indexOf(index) === -1
    );
    setTemplateItems([..._templateItems]);
  };

  const handleSubmit = () => {
    enqueueSnackbar('Criado template...', {
      variant: 'info',
      autoHideDuration: 2000
    });
    const templates = Object.values(templateItems)
      .filter(item => item.isChecked)
      .map(item => ({
        option: item.option._id,
        item: item._id,
        quantity: item.quantity,
        size: item.size || undefined
      }));

    const endpoint = getEndpoint(`/items/templates/${optionId}`);

    const postRequest = createPostRequest({ name: templateName, templates });
    fetch(endpoint, postRequest)
      .then(res => res.json())
      .then(({ error, ...rest }) => (error ? null : rest))
      .then(({ templateItem }) => {
        enqueueSnackbar('Template criado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        setTimeout(() => {
          history.push({
            pathname: '/items',
            state: {
              fromRedirect: true,
              optionId
            }
          });
        }, 1000);
      })
      .catch(e => {
        console.error(e.Message);
        enqueueSnackbar('Erro ao criar template :(', {
          variant: 'warning',
          autoHideDuration: 2000
        });
        setTimeout(() => {
          history.push({
            pathname: '/items',
            state: {
              fromRedirect: true,
              optionId
            }
          });
        }, 1000);
      });
  };

  const handleSave = () => {
    setTimeout(() => {
      history.push({
        pathname: '/items',
        state: {
          fromRedirect: true,
          optionId
        }
      });
    }, 1000);
  };

  return (
    <>
      <Container maxWidth="xl" className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: 'Opções', path: '/options' },
              { name: 'Templates' }
            ]}
          />
        </div>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            maxWidth: '100%'
          }}
        >
          <Grid item>
            <MoneyCard value={total} />
          </Grid>
          <Grid item>
            <SaveButton
              initialTitle="Criar template"
              loadingTitle="Criando template..."
              sucessTitle="Criado com sucesso!"
              onClick={handleSubmit}
              onSave={handleSave}
            />
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <br />
          <TemplateDatatable
            title={
              <InfoItem
                templateName={templateName}
                onNameChange={handleNameChange}
              />
            }
            templateItems={templateItems}
            onChangeValueX={handleChangeSizeX}
            onChangeValueY={handleChangeSizeY}
            onDuplicateItem={handleDuplicate}
            onCheckItem={handleCheck}
            onChangeQuantity={handleChangeQuantity}
            onDeleteTemplateItems={handleDeleteTemplateItems}
            isLoading={isLoading}
          />
        </Container>
      </Container>
    </>
  );
};

TemplateItems.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(memo(TemplateItems));
