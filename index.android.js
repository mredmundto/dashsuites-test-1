/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './app/store';
import devToolsEnhancer from 'remote-redux-devtools';
const createStoreWithMiddleware = applyMiddleware()(createStore);
const ReduxApp = () => {
  return (
    <Provider store={createStoreWithMiddleware(reducers, devToolsEnhancer())}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent('test', () => ReduxApp);

export default ReduxApp;