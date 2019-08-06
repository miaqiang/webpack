import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Iframe from '../../common/iframe'

class Page3 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {
		return (
			<div>
				page3
			{/* <Iframe title="page3" location={this.props.location}> </Iframe> */}
			</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page3);
