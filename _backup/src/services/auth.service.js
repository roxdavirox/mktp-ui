const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

const Login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  const endpoint = getEndpoint('/auth/authenticate');
  return fetch(endpoint, requestOptions).then(res => res.json());
};

// const GetToken = () => window.localStorage.getItem('jwt');
// const GetToken = () => Cookies.get('jwt');

// const GetUser = () => Cookies.get('user');
// const GetUser = () => window.localStorage.getItem('user');

const Logout = async () => {
  // window.localStorage.removeItem('jwt');
  // window.localStorage.removeItem('user');
  // Cookies.remove('jwt');
  // Cookies.remove('user');
};

export default {
  Login,
  Logout
};
