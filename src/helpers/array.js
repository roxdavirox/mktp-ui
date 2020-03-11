export function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'descending' ? comparison * -1 : comparison;
  };
}

export const convertToObjectWithKeys = arr => k => props =>
  arr.reduce(
    (obj, el) => ({
      ...obj,
      [el[k]]: { ...el, ...props }
    }),
    {}
  ) || {};

export const addNewPropsWhen = condition => newProps => arr =>
  arr.map(el => (condition(el) ? { ...el, ...newProps } : el));
