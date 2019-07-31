import Cookies from 'js-cookie';

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
      if (user && token) {
        Cookies.set('jwt', JSON.stringify(token));
        Cookies.set('user', JSON.stringify(user));
      }
      return user;
    });
};

const GetToken = () => Cookies.get('jwt');

const GetUser = () => Cookies.get('user');

const Logout = async () => {
  Cookies.remove('jwt');
  Cookies.remove('user');
};

export default {
  Login,
  Logout,
  GetUser,
  GetToken
};
