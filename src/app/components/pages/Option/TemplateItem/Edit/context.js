/* eslint-disable react/prop-types */
import React from 'react';
import useEditTemplateItem from './useEditTemplateItem';

export const EditTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useEditTemplateItem();

  return (
    <EditTemplateItemContext.Provider value={context}>
      {children}
    </EditTemplateItemContext.Provider>
  );
};
