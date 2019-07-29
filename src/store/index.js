/*
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
));
*/
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducer';

let store = createStore(reducers)
export default store;