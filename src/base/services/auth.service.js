const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

const Login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  const endpoint = getEndpoint('/auth/authenticate');
  return fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(res => {
      const { user, token } = res;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));

      return user;
    });
};

const Logout = async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export default {
  Login,
  Logout
};
