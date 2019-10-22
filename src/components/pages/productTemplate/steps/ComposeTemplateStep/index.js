/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import {
  selectTemplateItems,
  selectOptions
} from 'store/ducks/productTemplate';

const TemplateContainer = () => {
  const [total, setTotal] = useState(0);
  const options = useSelector(selectOptions);
  const items = useSelector(selectTemplateItems);

  return (
    <>
      <Container maxWidth="xl">
        <p>Total: {total}</p>
        <Datatable
          dataOptions={options}
          dataItems={items}
          calcular={setTotal}
        />
      </Container>
    </>
  );
};

export default TemplateContainer;
