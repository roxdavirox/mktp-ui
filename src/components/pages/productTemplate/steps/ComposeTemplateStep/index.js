import React from 'react';
import Container from '@material-ui/core/Container';
import Datatable from './Datatable';
import InfoItem from './InfoItem';

const ComposeTemplateStep = () => (
  <>
    <Container maxWidth="xl">
      <InfoItem />
      <Datatable />
    </Container>
  </>
);

export default ComposeTemplateStep;
