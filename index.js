import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-native-paper';
import App from './src/App';

export default function MainApp() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
