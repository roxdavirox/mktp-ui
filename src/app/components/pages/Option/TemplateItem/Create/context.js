/* eslint-disable react/prop-types */
import React from 'react';
import useCreateTemplateItem from './useCreateTemplateItem';

export const CreateTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useCreateTemplateItem();

  return (
    <CreateTemplateItemContext.Provider value={context}>
      {children}
    </CreateTemplateItemContext.Provider>
  );
};
