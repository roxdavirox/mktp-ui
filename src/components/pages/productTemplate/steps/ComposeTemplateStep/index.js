/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import {
  selectTemplateItems,
  selectOptions,
  selectTotal
} from 'store/ducks/productTemplate';

const TemplateContainer = () => {
  const total = useSelector(selectTotal);
  const options = useSelector(selectOptions);
  const items = useSelector(selectTemplateItems);

  return (
    <>
      <Container maxWidth="xl">
        <p>Total: {total}</p>
        <Datatable dataOptions={options} dataItems={items} />
      </Container>
    </>
  );
};

export default TemplateContainer;
