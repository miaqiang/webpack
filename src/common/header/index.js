import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Header extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {
		return (
			<div> this is header</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Header);
