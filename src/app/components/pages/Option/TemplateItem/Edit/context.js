/* eslint-disable react/prop-types */
import React from 'react';
import useTemplateItem from '../useTemplateItem';

export const EditTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useTemplateItem();

  return (
    <EditTemplateItemContext.Provider value={context}>
      {children}
    </EditTemplateItemContext.Provider>
  );
};
