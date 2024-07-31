import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
