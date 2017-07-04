
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import ReduxPromise from 'redux-promise';
import routes from './route';
import {Router,browserHistory} from 'react-router';
import App from './components/app';
import reducers from './reducers/index';

import styles from '../styles/style.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.getElementById('container'));
