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
import TemplateInfo from './TemplateInfo';
import { getEndpoint, createPostRequest } from 'helpers/api';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';
import reactUuid from 'react-uuid';

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
  const itemsWithUuid = itemsWithSize.map(i => ({ ...i, uuid: reactUuid() }));
  return convertToObjectWithKeys(itemsWithUuid)('uuid')(defaulItemProps);
};

const convertObjectToArray = obj => Object.values(obj);

const TemplateItems = ({ enqueueSnackbar, ...props }) => {
  const [total, setTotal] = useState(0);
  const [priceTables, setPriceTables] = useState({});
  const [templateQuantity, setTemplateQuantity] = useState(1);
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
          const _defaultPriceTables = Object.values(objectItems)
            .filter(item => item.itemType === 'item' && item.priceTable)
            .reduce((obj, item) => {
              const { priceTable } = item;
              const { _id: priceTableId } = priceTable;
              return {
                ...obj,
                [priceTableId]: {
                  id: priceTableId,
                  area: 0,
                  unitPrice: 0
                }
              };
            }, {});
          setPriceTables(_defaultPriceTables);
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
    if (!templateItems) return;
    handleUnitPriceTableCalculate();
  }, [templateItems]);

  useEffect(() => {
    if (!priceTables) return;
    handleTotalPriceCalculate();
  }, [priceTables]);

  const handleChangeTemplateQuantity = quantity =>
    setTemplateQuantity(quantity);

  const handleChangeItemPrice = (id, price) => {
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: { ...prevItems[id], price }
    }));
  };

  const handleChangeSizeX = (id, valueX) => {
    const templateItem = templateItems[id];
    const {
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
  };

  const handleChangeSizeY = (id, valueY) => {
    const templateItem = templateItems[id];
    const {
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
  };

  const handleDuplicate = uuidDuplicated => {
    const _templates = Object.values(templateItems).reduce((obj, item) => {
      if (item.uuid === uuidDuplicated) {
        const newUuid = reactUuid();

        return {
          ...obj,
          [item.uuid]: item,
          [newUuid]: { ...item, uuid: newUuid }
        };
      }
      return {
        ...obj,
        [item.uuid]: item
      };
    }, {});

    setTemplateItems(_templates);
  };

  const handleCheck = id => {
    const { isChecked } = templateItems[id];

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
  };

  const handleUnitPriceTableCalculate = () => {
    const checkedTemplateItems = convertObjectToArray(templateItems).filter(
      item => item.isChecked
    );

    if (!checkedTemplateItems) return;

    const checkedItems = checkedTemplateItems.filter(
      item => item.itemType === 'item' && item.priceTable
    );

    const _priceTables = Object.values(priceTables).reduce(
      (obj, pt) => ({
        ...obj,
        [pt.id]: { ...pt, area: 0, unitPrice: 0 }
      }),
      {}
    );

    const groupedPriceTables = checkedItems.reduce((obj, item) => {
      const { priceTable } = item;
      const { _id: priceTableId } = priceTable;

      const { area } = obj[priceTableId];
      return {
        ...obj,
        [priceTableId]: {
          ...obj[priceTableId],
          id: priceTableId,
          area: item.quantity * item.size.x * item.size.y + area
        }
      };
    }, _priceTables);

    const body = {
      priceTables: Object.values(groupedPriceTables)
    };

    const request = createPostRequest(body);
    const endpoint = getEndpoint(`/price-tables/prices`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ priceTables }) => {
        setPriceTables(priceTables);
      })
      .catch(error => {
        console.log(`Error on get total value ${error}`);
      });
  };

  const handleTotalPriceCalculate = () => {
    const checkedTemplateItems = convertObjectToArray(templateItems).filter(
      item => item.isChecked
    );

    const checkedItems = checkedTemplateItems.filter(
      item => item.itemType === 'item' && item.priceTable
    );

    const totalItemPrice = checkedItems
      .filter(i => i.itemType === 'item')
      .reduce((_total, item) => {
        const { unitPrice } = priceTables[item.priceTable._id];
        const totalPrice =
          item.size.x * item.size.y * item.quantity * unitPrice;
        return _total + totalPrice;
      }, 0);

    const totalTemplateItemPrice = checkedTemplateItems
      .filter(i => i.itemType === 'template')
      .reduce(
        (_total, templateItem) =>
          _total + templateItem.templatePrice * templateItem.quantity,
        0
      );

    const _total = totalItemPrice + totalTemplateItemPrice;
    setTotal(_total);
  };

  const handleNameChange = newName => setTemplateName(newName);

  const handleChangeQuantity = (id, quantity) => {
    const { isChecked } = templateItems[id];
    if (quantity < 1) return;
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: {
        ...prevItems[id],
        quantity
      }
    }));
    if (!isChecked) return;
  };

  const handleDeleteTemplateItems = indexRows => {
    const filteredItems = Object.values(templateItems).filter(
      (_, index) => indexRows.indexOf(index) === -1
    );
    const _templateItems = convertToObjectWithKeys(filteredItems)('uuid')({});
    setTemplateItems(_templateItems);
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
      .then(() => {
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
              <TemplateInfo
                templateName={templateName}
                onNameChange={handleNameChange}
                templateQuantity={templateQuantity}
                onChangeQuantity={handleChangeTemplateQuantity}
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
            priceTables={priceTables}
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
