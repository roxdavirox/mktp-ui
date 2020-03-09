/* eslint-disable no-console */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import history from 'history.js';

import { Breadcrumb } from 'matx';
import TemplateDatatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint, createPostRequest } from 'helpers/api';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';

const TemplateItems = ({ enqueueSnackbar, ...props }) => {
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
          const _items = items
            .map(item => {
              if (item.priceTable && item.priceTable.unit === 'quantidade') {
                return item;
              } else {
                return { ...item, size: { x: 1, y: 1 } };
              }
            })
            .map(item => ({
              ...item,
              price: 0,
              quantity: 1,
              isChecked: false
            }));
          setTemplateItems(_items);
          setLoadingState(false);
        })
        .catch(error => {
          console.log(`Error on get template items ${error}`);
        });
    }
    AsyncGetTemplateItems();
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
    console.log('template item checado:', templateItem);
    handleCalculateItemPrice(index, templateItem);
  };

  const reduceTotalPrice = () =>
    templateItems
      .filter(item => item.isChecked)
      .reduce((total, item) => total + item.price, 0);

  const handleNameChange = newName => setTemplateName(newName);

  const handleChangeQuantity = (index, quantity) => {
    if (quantity < 1) return;
    templateItems[index] = { ...templateItems[index], quantity };
    const templateItem = templateItems[index];
    handleCalculateItemPrice(index, templateItem);
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
    const templates = templateItems
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
        const unchekedTemplateItems = templateItems.map(tp => ({
          ...tp,
          isChecked: false,
          price: 0
        }));
        setTemplateItems([
          ...unchekedTemplateItems,
          { ...templateItem, isChecked: false, price: 0, quantity: 1 }
        ]);
        setTemplateName('');
        console.log('create template item response:', templateItem);
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

  const total = reduceTotalPrice();

  console.log('total', total);
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
            alignItems: 'flex-end'
          }}
        >
          <Grid item>
            <MoneyCard value={total} />
          </Grid>
          <Grid item>
            <SaveButton
              initialTitle="Criar template"
              loadingTitle="criando template..."
              sucessTitle="criado com sucesso!"
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
