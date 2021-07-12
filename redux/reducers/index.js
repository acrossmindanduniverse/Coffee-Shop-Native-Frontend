import {combineReducers} from 'redux';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';

import items from './items';
import auth from './auth';
import cart from './cart';
import user from './user';

// const persistAuth = {
//   storage,
//   key: 'auth',
// };

const reducer = combineReducers({
  // auth: persistReducer(persistAuth, auth),
  auth,
  user,
  items,
  cart,
});

export default reducer;
