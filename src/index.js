import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { syncHistory, routeReducer, UPDATE_LOCATION } from 'react-router-redux';
import createLogger from 'redux-logger';
import createHashHistory from 'history/lib/createHashHistory';

// routes
import Circles from './Circles/Circles.js';
import OneList from './OneList/OneList.js';
import FourList from './FourList/FourList.js';

// initial circle data
function getInitialState() {
  return [
    { x: 40,  y: 60, r: 5 },
    { x: 80,  y: 60, r: 5 },
    { x: 120, y: 60, r: 5 }
  ];
}

// route one circle data
function getRouteOneState() {
  return [
    { x: 60, y: 80, r: 20 },
    { x: 100, y: 80, r: 20 },
    { x: 140, y: 80, r: 20 }
  ];
}

// route two circle data
function getRouteTwoState() {
  return [
    { x: 100, y: 50, r: 40 },
    { x: 200, y: 50, r: 40 },
    { x: 300, y: 50, r: 40 }
  ];
}

// route three circle data
function getRouteThreeState() {
  return [
    { x: 40,  y: 10, r: 10 },
    { x: 80,  y: 10, r: 10 },
    { x: 120, y: 10, r: 10 }
  ];
}

// pathname to circle data map
const circleDataMap = {
  '/': getInitialState(),
  '/one': getRouteOneState(),
  '/two': getRouteTwoState(),
  '/three': getRouteThreeState()
};

// main reducer, right now only holds circleData
function circleDataReducer(state = getInitialState(), action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { pathname } = action.payload;
      return circleDataMap[pathname] || state;
    default:
      return state;
  }
}

// Sets up the redux router middleware
var history = useRouterHistory(createHashHistory)({
  queryKey: false, // what does this do?
});
const router = syncHistory(history);

// helpful logging middleware
const logger = createLogger();

const store = createStore(
  // combine all the redux reducers
  combineReducers({
    circleData: circleDataReducer,
    routing: routeReducer
  }),
  // apply all the redux middleware
  applyMiddleware(
    logger,
    router
  )
);

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/one" components={{ main: Circles, side: OneList }} />
          <Route path="/two" components={{ main: Circles }} />
          <Route path="/three" components={{ main: Circles }} />
          <Route path="/four" components={{ main: FourList }} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
