import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth'
import signup from './signup'
import task from './task'
const rootReducer = combineReducers({
  auth,
  signup,
  task
});

let storeEnhancer;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancer
  )
}
