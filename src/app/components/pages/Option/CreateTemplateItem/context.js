/* eslint-disable react/prop-types */
import React from 'react';
import useTemplate from './useTemplateItems';

export const CreateTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useTemplate();

  return (
    <CreateTemplateItemContext.Provider value={context}>
      {children}
    </CreateTemplateItemContext.Provider>
  );
};
