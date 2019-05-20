export const ADD_ENTITIES = 'FETCH_OPTIONS_SUCCESS';

export const addEntities = entities => ({
  type: ADD_ENTITIES,
  playload: { entities }
});
