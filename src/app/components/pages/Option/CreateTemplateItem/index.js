/* eslint-disable no-console */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import history from 'history.js';

import { Breadcrumb } from 'matx';
import TemplateDatatable from './Datatable';
import TemplateInfo from './TemplateInfo';
import { getEndpoint, createPostRequest } from 'helpers/api';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';
import useTemplateItems from './useTemplateItems';

const TemplateItems = ({ enqueueSnackbar, ...props }) => {
  const {
    total,
    templateItems,
    templateQuantity,
    check,
    duplicateItem,
    changeItemQuantity,
    setTemplateQuantity,
    changeSizeX,
    changeSizeY,
    deleteTemplateItems,
    priceTables,
    fetchTemplateItems
  } = useTemplateItems();

  const [isLoading, setLoadingState] = useState(true);
  const [templateName, setTemplateName] = useState('');
  // eslint-disable-next-line react/prop-types
  const { optionId } = props.location.state;

  useEffect(() => {
    async function AsyncGetTemplateItems() {
      setLoadingState(true);
      await fetchTemplateItems();
      setLoadingState(false);
    }
    AsyncGetTemplateItems();
  }, []);

  const handleChangeTemplateQuantity = quantity =>
    setTemplateQuantity(quantity);

  const handleChangeSizeX = (id, valueX) => changeSizeX(id, valueX);

  const handleChangeSizeY = (id, valueY) => changeSizeY(id, valueY);

  const handleDuplicate = uuidDuplicated => duplicateItem(uuidDuplicated);

  const handleCheck = id => check(id);

  const handleNameChange = newName => setTemplateName(newName);

  const handleChangeQuantity = (id, quantity) =>
    changeItemQuantity(id, quantity);

  const handleDeleteTemplateItems = indexRows => deleteTemplateItems(indexRows);

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

    const postRequest = createPostRequest({
      name: templateName,
      templates,
      templateQuantity
    });
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
