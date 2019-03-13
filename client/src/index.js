import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers from './store';
import indexRoutes from './routes/index.routes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const hist = createBrowserHistory();
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk, logger))(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
        <Provider store={store}>
            <Router history={hist}>
                <Switch>
                {indexRoutes.map((prop, key) => {
	                return <Route exact path={prop.path} component={prop.component} key={key} />;
	            })}
                </Switch>
            </Router>
        </Provider>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
