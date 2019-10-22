/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import { getEndpoint } from 'helpers/api';
import {
  fetchTemplateItems,
  selectTemplateItems
} from 'store/ducks/productTemplate';

const TemplateContainer = () => {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    dispatch(fetchTemplateItems());
  }, []);

  const items = useSelector(selectTemplateItems);

  return (
    <>
      <Container maxWidth="xl">
        {/* <InfoItem options={options} /> */}
        <Datatable dataOptions={options} dataItems={items} />
      </Container>
    </>
  );
};

export default TemplateContainer;
