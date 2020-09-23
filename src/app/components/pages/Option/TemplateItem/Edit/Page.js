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

const TemplateItemPage = ({ location }) => {
  const { itemId } = location.state;
  const {
    total,
    templateQuantity,
    fetchCheckedTemplateItemsById,
    templateName,
    setTemplateName,
    templateItems
  } = useContext(EditTemplateItemContext);

  useEffect(() => {
    if (!itemId) return;
    async function asyncGetTemplateItems() {
      await fetchCheckedTemplateItemsById(itemId);
    }
    asyncGetTemplateItems();
  }, []);

  const handleSubmit = () => {};
  console.log('templateItems', templateItems);
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

export default TemplateItemPage;
