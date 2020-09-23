import { getEndpoint } from 'helpers/api';
import { mapSizeItem, mapDefaultItemInfos } from './helpers';

export const getTemplateItems = async () => {
  const endpoint = getEndpoint('/items/templates');
  const response = await fetch(endpoint);
  const { items } = await response.json();
  const _templateItems = items.map(mapSizeItem).map(mapDefaultItemInfos);

  return _templateItems;
};

export const fetchOptions = async () => {
  const optionsEndpoint = getEndpoint('/options');
  const res = await fetch(optionsEndpoint);
  const { options } = await res.json();
  return options;
};
