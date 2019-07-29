// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux'
/*import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';*/

function menuStateShow(state=true,action){
	switch (action.type){
		case 'menuStateShow':
		return action.state;
		default:
		return state;
	}
}

const reducer = combineReducers({
	menuStateShow:menuStateShow
/*	header: headerReducer,
	home: homeReducer,
	detail: detailReducer,
	login: loginReducer*/
});

export default reducer;
