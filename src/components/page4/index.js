import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Iframe from '../../common/iframe'

class Page4 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	
	render() {
		return (
			<div>
				page4
				{/* <Iframe title="page4" location={this.props.location}> </Iframe> */}
			</div>
			
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page4);
