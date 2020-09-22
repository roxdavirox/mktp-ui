/* eslint-disable react/display-name */
import React from 'react';
import { TemplateItemProvider } from './context';
import Page from './Page';

export default props => {
  return (
    <TemplateItemProvider>
      <Page {...props} />
    </TemplateItemProvider>
  );
};
