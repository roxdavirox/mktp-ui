import { schema } from 'normalizr';

const id = { idAttribute: '_id' };

export const priceSchema = new schema.Entity('prices', {}, id);

export const itemSchema = new schema.Entity(
  'items',
  {
    price: priceSchema
  },
  id
);

export const optionSchema = new schema.Entity(
  'options',
  {
    items: [itemSchema]
  },
  id
);
