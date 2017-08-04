import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../react/src/containers/App'
import data from '../react/src/constants/data';



document.addEventListener('DOMContentLoaded', () => {
  console.log(document.getElementById('app-page'))
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('app-page')
  );
})
