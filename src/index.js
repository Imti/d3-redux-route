import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import createHashHistory from 'history/lib/createHashHistory';

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

const circleDataMap = {
  '/one': getRouteOneState(),
  '/two': getRouteTwoState(),
  '/three': getRouteThreeState()
};

// main reducer, right now only holds circleData
function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case '@@router/UPDATE_LOCATION':
      const route = action.payload.pathname;
      return circleDataMap[route];
    default:
      return state;
  }
}

// Sets up the redux router middleware
var history = useRouterHistory(createHashHistory /* do we need this? */ )({
  queryKey: false, // what does this do?
});
const router = syncHistory(history);

// helpful logging middleware
const logger = createLogger();

const store = createStore(
  /* reducer,*/

  // TODO: add routing reducer
  combineReducers({
    circleData: reducer,
    routing: routeReducer
  }),

  applyMiddleware(
    logger,
    router
  )
);

// TODO: is this necessary?
store.subscribe(() => {
  console.log('STORE STATE', store.getState());
});

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}></Route>
        <Route path="one" component={App}></Route>
        <Route path="two" component={App}></Route>
        <Route path="three" component={App}></Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
