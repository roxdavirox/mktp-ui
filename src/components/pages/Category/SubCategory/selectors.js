import { getCategoryById } from '../selectors';

export const getSubcategories = (categoryId, store) =>
  getCategoryById(categoryId, store)
    ? getCategoryById(categoryId, store).subCategories
    : [];
