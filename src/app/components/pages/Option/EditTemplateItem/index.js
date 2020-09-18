/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import TemplateInfo from './TemplateInfo';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';
import Grid from '@material-ui/core/Grid';
import { Breadcrumb } from 'matx';
import { getEndpoint, createPostRequest } from 'helpers/api';
import { getTemplateItems } from './service';

const TemplateItemPage = ({ location }) => {
  const { itemId } = location.state;
  const [total, setTotal] = useState(0);
  const [options, setOptions] = useState([]);
  const [priceTables, setPriceTables] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [templateItems, setTemplateItems] = useState([]);
  const [templateQuantity, setTemplateQuantity] = useState(1);

  useEffect(() => {
    async function AsyncGetTemplateItems() {
      const _templateItems = await getTemplateItems();
      const itemsEndpoint = getEndpoint(`/items/${itemId}`);
      fetch(itemsEndpoint)
        .then(res => res.json())
        .then(({ item }) => {
          setTemplateName(item.name);
          setTemplateQuantity(item.templateQuantity || 1);
          return item;
        })
        .then(item => {
          const { templates } = item;
          const checkedTemplates = templates.map(t => ({
            ...t.item,
            ...t,
            isChecked: true
          }));
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

  const handleCalculateTotal = (rowIndex, templateItem, isChecked) => {
    const { quantity, size } = templateItem;
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

  const handleTotalPriceCalculate = () => {
    const checkedTemplateItems = Object.values(templateItems).filter(
      item => item.isChecked
    );

    const checkedItems = checkedTemplateItems.filter(
      item => item.itemType === 'item' && item.priceTable
    );

    const totalItemPrice = checkedItems
      .filter(i => i.itemType === 'item')
      .reduce((_total, item) => {
        const { unitPrice = 1, unit } = priceTables[item.priceTable._id];
        const totalPrice =
          unit !== 'quantidade'
            ? item.size.x * item.size.y * item.quantity * unitPrice
            : item.quantity * unitPrice;
        return _total + totalPrice;
      }, 0);

    const totalTemplateItemPrice = checkedTemplateItems
      .filter(i => i.itemType === 'template' && i.priceTables)
      .reduce((_totalTemplate, templateItem) => {
        const totalPriceTables = Object.values(templateItem.priceTables).reduce(
          (_totalPriceTable, pt) => {
            const { unitPrice = 1, unit } = priceTables[pt.id];
            const totalPrice =
              unit !== 'quantidade'
                ? templateItem.size.x *
                  templateItem.size.y *
                  templateItem.quantity *
                  unitPrice
                : templateItem.quantity * unitPrice;
            const areaPriceTable = pt.area > 0 ? pt.area : 1;
            return _totalPriceTable + totalPrice * areaPriceTable;
          },
          0
        );
        return _totalTemplate + totalPriceTables;
      }, 0);

    const _total = (totalItemPrice + totalTemplateItemPrice) * templateQuantity;
    setTotal(_total);
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
          <Grid
            item
            style={{
              display: 'flex'
            }}
          >
            <MoneyCard
              title="Valor unitário"
              value={total / templateQuantity}
            />
            <MoneyCard
              title="Valor total"
              value={total}
              style={{ margin: '0px 16px' }}
            />
          </Grid>

          <Grid item>
            <SaveButton
              initialTitle="Editar template"
              loadingTitle="Editando template..."
              sucessTitle="Editado com sucesso!"
              onClick={handleSubmit}
            />
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <br />
          <Datatable
            title={
              <TemplateInfo
                templateName={templateName}
                onNameChange={name => setTemplateName(name)}
                templateQuantity={templateQuantity}
                onChangeQuantity={quantity => setTemplateQuantity(quantity)}
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
      </Container>
    </>
  );
};

TemplateItemPage.propTypes = {
  location: PropTypes.object
};

export default TemplateItemPage;
