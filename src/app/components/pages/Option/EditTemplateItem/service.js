import { getEndpoint } from 'helpers/api';
import { convertIdToItemId, mapSizeItem, mapDefaultItemInfos } from './helpers';

export const getTemplateItems = async () => {
  const endpoint = getEndpoint('/items/templates');
  const response = await fetch(endpoint);
  const { items } = await response.json();
  const _templateItems = items
    .map(convertIdToItemId)
    .map(mapSizeItem)
    .map(mapDefaultItemInfos);

  return _templateItems;
};
