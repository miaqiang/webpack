import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Page1 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {
		return (
			<div> this is Page1</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page1);
