
let reducers = {

	contentMinHeight: function (state = 0, action) {
		if (action.type == "contentMinHeight") {
			let height = action.contentMinHeight;
			height = height < 360 ? 360 : height;
			return height;
		}
		return state;
	}
}

export default reducers;