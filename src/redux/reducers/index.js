import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

import items from './items';
import auth from './auth';
import cart from './cart';
import user from './user';
import chat from './chat';

const persistAuth = {
  storage: AsyncStorage,
  key: 'auth',
};

const reducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  chat,
  user,
  items,
  cart,
});

export default reducer;
