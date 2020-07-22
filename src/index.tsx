import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  <div style={{height: '100vh'}}>
    <CssBaseline />
    <App />
  </div>,
  document.getElementById('root')
);
