import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter , Route,Router  } from 'react-router-dom';
import Header from '../../common/header';
import Left from '../../common/left';
import store from '../../store';
import Home from '../../components/home';
import Page2 from '../../components/page2';
/*import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
*/


class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<HashRouter >
      		<div>
            <Header />
            <Left/>
            <div>
              <Route path='/' exact component={Page2}></Route>
        		  <Route path='/page1' exact component={Home}></Route>
              <Route path='/page2' exact component={Page2}></Route>
            </div>
              {/*<Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
      			<Route path='/detail/:id' exact component={Detail}></Route>*/}
      		</div>
      	</HashRouter >
      </Provider>
    );
  }
}

export default App;
