import React from 'react';
import { render } from 'react-dom';
import 'assets/scss/material-dashboard-pro-react.scss?v=1.5.0';
// import App from 'components/app';
import App from './app/App';
const rootElement = document.getElementById('root');

render(<App />, rootElement);
