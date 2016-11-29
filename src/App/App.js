import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Route } from 'react-router';
import { routeActions } from 'react-router-redux';

class App extends Component {
  navigateTo = (page) => {
    return () => {
      this.props.dispatch(routeActions.push(`/${page}`));
    };
  }

  componentWillMount() {
    const { routing, dispatch } = this.props;
    const { pathname } = routing.location;

    // re-route '/' to '/one'
    if (pathname === '/') dispatch(routeActions.push('/one'));
  }

  render() {
    const { circleData, main, side } = this.props;

    return (
      <div className="App">
        <button onClick={this.navigateTo('one')}>View 1</button>
        <button onClick={this.navigateTo('two')}>View 2</button>
        <button onClick={this.navigateTo('three')}>View 3</button>
        <button onClick={this.navigateTo('four')}>View 4</button>
        { main }
        { side }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { routing: state.routing };
}

export default connect(mapStateToProps)(App);
