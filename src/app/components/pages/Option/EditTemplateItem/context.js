/* eslint-disable react/prop-types */
import React from 'react';
import useTemplate from './useTemplateItems';

export const EditTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useTemplate();

  return (
    <EditTemplateItemContext.Provider value={context}>
      {children}
    </EditTemplateItemContext.Provider>
  );
};
