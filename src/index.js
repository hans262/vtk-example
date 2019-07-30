import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker'
import VtkRoot from './vtk/VtkRoot'
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <VtkRoot />
  </Provider>,
  document.getElementById('root')
)

// If you want your system to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()