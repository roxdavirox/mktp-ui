/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCheckedTemplateItems } from 'store/ducks/productTemplate';

const ConfirmStep = () => {
  const productTemplateState = useSelector(store => store.productTemplates);
  const { name, option } = productTemplateState;
  const selectedItems = useSelector(selectCheckedTemplateItems);

  return (
    <>
      <h4>Informações do template</h4>
      <p>
        Nome do template: <b>{name}</b>
      </p>
      <p>
        Opção: <b>{option.name}</b>
      </p>
      {selectedItems && (
        <ul>
          {selectedItems.map((templateItem, index) => (
            <li key={index}>
              {templateItem.option.name} {': '}
              <b>{templateItem.name}</b> quantidade:{' '}
              <b>{templateItem.quantity}</b>
              {templateItem.size &&
                ` tamanho: ${templateItem.size.x} x ${templateItem.size.y}`}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ConfirmStep;
