export const host = process.env.REACT_APP_HOST_API;

export const getEndpoint = route => `${host}${route}`;

export const createPostRequest = body => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});
