/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';

const ConfirmStep = () => {
  const productTemplateState = useSelector(store => store.productTemplates);
  const { name, selectedItems, option } = productTemplateState;

  console.log('state:', productTemplateState);
  return (
    <>
      <h4>Informações do template</h4>
      <p>
        Nome do template: <b>{name}</b>
      </p>
      <p>
        Opção: <b>{option.name}</b>
      </p>
      {Object.keys(selectedItems) && (
        <ul>
          {Object.keys(selectedItems).map(keyItem => (
            <li key={keyItem}>
              {selectedItems[keyItem].option.name} {': '}
              <b>{selectedItems[keyItem].name} </b>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ConfirmStep;
