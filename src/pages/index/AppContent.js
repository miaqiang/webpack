import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Header from 'src/components/common/header';
import Left from 'src/components/common/left';
import Home from 'src/components/home';
/* import Page2 from 'src/components/page2';
import Page3 from 'src/components/page3';
import Page4 from 'src/components/page4'; */


import 'src/assets/styles/common.less'

const Page2 = lazy(() => import('src/components/page2'));
const Page3 = lazy(() => import('src/components/page3'));
const Page4 = lazy(() => import('src/components/page4'));



// QM 2019/7/31

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contentMinHeight: 0
    }
    this.handleResize = this.handleResize.bind(this);

  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
  /**
   * resize时的处理
   */
  handleResize() {
    let windowHeight = $(window).height();
    let contentHeight = $("#mainContainer").height();
    let leftMenuHeight = $(".left-menu .item-wrap").height();
    this.setState({ contentMinHeight: Math.max(leftMenuHeight, windowHeight - 60) });
    let contentMinHeight = $(window).height() - 60;
    this.props.changeContentMinHeight(contentMinHeight);
  }
  render() {

    return (
      <div>
        <Header />
        <div className="content">
          <Left location={this.props.location} />
          <div className="right-content">
            <div className="mainContainer" style={{ minHeight: this.state.contentMinHeight + "px" }}>
              <Suspense fallback={<div>loading...</div>}>
                <Switch>
                  <Route path='/page1' component={Home}></Route>
                  <Route path='/page2' exact component={Page2}></Route>
                  <Route path='/page3' exact component={Page3}></Route>
                  <Route path='/page4' exact component={Page4}></Route>
                  <Redirect path='/' to='/page2' ></Redirect>
                </Switch>
              </Suspense>
            </div>

          </div>
        </div>
      </div >

    );
  }
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
  changeContentMinHeight: function (contentMinHeight) {
    dispatch({ type: 'contentMinHeight', contentMinHeight });
  },
});

export default withRouter(connect(mapState, mapDispatch)(App));

//export default withRouter(App);
