
import { combineReducers } from 'redux';
import reducers1 from './reducer1';
import reducers2 from './reducer2';



let reducers = Object.assign({},
	reducers1,
	reducers2);

console.log('reducers', reducers);
const reducer = combineReducers(reducers);

export default reducer;
