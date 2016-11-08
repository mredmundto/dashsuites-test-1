/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './app/components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './app/store';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default class test extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
          <App />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('test', () => test);
