/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import InfoItem from './InfoItem';
import { getEndpoint } from 'helpers/api';

const TemplateContainer = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');
    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(({ options }) => setOptions(options))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        {/* <InfoItem options={options} /> */}
        <Datatable data={options} />
      </Container>
    </>
  );
};

export default TemplateContainer;
