import React, { PureComponent } from 'react';
import { connect } from 'react-redux';


import { Switch, Route, Redirect } from 'react-router-dom';

import Page2 from '../page2';
import Page3 from '../page3';


class Page1 extends PureComponent {
	componentDidMount() {

	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div>
				hello page1
				<Switch>
					<Route path='/page1/page6' component={Page2}></Route>
					<Route path='/page1/page7' exact component={Page3}></Route>
					<Redirect path='/' to='/page1/page7' ></Redirect>
				</Switch>
			</div>
		)
	}
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, mapDispatch)(Page1);
