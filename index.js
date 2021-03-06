/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import reduxConfig from './src/redux/store';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

const redux = reduxConfig();
PushNotification.configure({
  onRegister: token => {
    redux.store.dispatch({
      type: 'REGISTER_TOKEN',
      payload: token,
    });
    console.log('FCM Token: ', token);
  },
});

PushNotification.createChannel({
  channelId: 'general-notif',
  channelName: 'General Notification',
});

const Main = () => {
  return (
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
