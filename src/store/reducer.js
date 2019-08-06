
import { combineReducers } from 'redux'

function contentMinHeight(state = 0, action) {
	if (action.type == "contentMinHeight") {
		let height=action.contentMinHeight;
		height=height<360?360:height;
	  return height;
	}
	return state;
}

const reducer = combineReducers({
	contentMinHeight:contentMinHeight
});

export default reducer;
