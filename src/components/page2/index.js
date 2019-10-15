import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Page2 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}

	render() {

		return (
			<div>
				page2
			</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page2);
