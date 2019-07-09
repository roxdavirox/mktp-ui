export const host = process.env.REACT_APP_HOST_API;

export const getEndpoint = route => `${host}${route}`;
