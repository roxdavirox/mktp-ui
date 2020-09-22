/* eslint-disable react/prop-types */
import React from 'react';
import useTemplateItem from '../useTemplateItem';

export const CreateTemplateItemContext = React.createContext(null);

export const TemplateItemProvider = ({ children }) => {
  const { ...context } = useTemplateItem();

  return (
    <CreateTemplateItemContext.Provider value={context}>
      {children}
    </CreateTemplateItemContext.Provider>
  );
};
