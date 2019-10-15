
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducer';

let store = createStore(reducers)
export default store;