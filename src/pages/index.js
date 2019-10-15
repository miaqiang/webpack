import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route, } from 'react-router-dom';
// import App from './App';
import store from 'src/store';
import AppContent from './index/AppContent';


class Routers extends React.Component {
    render() {
        return (
            <div style={{ "position": "relative" }}>
                <Switch>
                    <Route path="/" component={AppContent}></Route>
                </Switch>
            </div>
        )
    }
}


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter >
                    <Routers />
                </HashRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
} 
