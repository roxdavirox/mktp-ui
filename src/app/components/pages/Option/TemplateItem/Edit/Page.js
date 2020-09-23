/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import TemplateInfo from './TemplateInfo';
import MoneyCard from 'app/components/common/cards/MoneyCard';
import SaveButton from 'app/components/common/buttons/SaveButton';
import Grid from '@material-ui/core/Grid';
import { Breadcrumb } from 'matx';
import { EditTemplateItemContext } from './context';
import { getEndpoint, createPutRequest } from 'helpers/api';
import history from 'history.js';
import { withSnackbar } from 'notistack';

const TemplateItemPage = ({ location, enqueueSnackbar }) => {
  const { itemId } = location.state;
  const {
    total,
    templateQuantity,
    fetchCheckedTemplateItemsById,
    templateName,
    setTemplateName,
    templateItems,
    option,
    templateItem
  } = useContext(EditTemplateItemContext);

  useEffect(() => {
    if (!itemId) return;
    async function asyncGetTemplateItems() {
      await fetchCheckedTemplateItemsById(itemId);
    }
    asyncGetTemplateItems();
  }, []);

  const handleSubmit = () => {
    enqueueSnackbar('Editando template...', {
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

    const endpoint = getEndpoint(`/items/templates/${templateItem._id}`);

    const postRequest = createPutRequest({
      name: templateName,
      templates,
      templateQuantity
    });
    fetch(endpoint, postRequest)
      .then(res => res.json())
      .then(({ error, ...rest }) => (error ? null : rest))
      .then(() => {
        enqueueSnackbar('Template editado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        setTimeout(() => {
          history.push({
            pathname: '/items',
            state: {
              fromRedirect: true,
              optionId: option._id
            }
          });
        }, 1000);
      })
      .catch(e => {
        console.error(e.Message);
        enqueueSnackbar('Erro ao editar template :(', {
          variant: 'warning',
          autoHideDuration: 2000
        });
        setTimeout(() => {
          history.push({
            pathname: '/items',
            state: {
              fromRedirect: true,
              optionId: option._id
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
          optionId: option._id
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
              initialTitle="Editar template"
              loadingTitle="Editando template..."
              sucessTitle="Editado com sucesso!"
              onClick={handleSubmit}
              onSave={handleSave}
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
              />
            }
          />
        </Container>
      </Container>
    </>
  );
};

TemplateItemPage.propTypes = {
  location: PropTypes.object
};

export default withSnackbar(TemplateItemPage);
