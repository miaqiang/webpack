import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Iframe from '../../common/iframe'

class Page2 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {

		return (
			<div>
				page2
			{/* <Iframe title="page2" location={this.props.location}> </Iframe> */}
			</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page2);