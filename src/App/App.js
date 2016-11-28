import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import Circles from '../Circles/Circles';

class App extends Component {
  navigateTo = (page) => {
    return () => {
      /* this.props.dispatch({type: page});*/

      // TODO: add routing
      this.props.dispatch(routeActions.push(`/${page}`));
    };
  }

  render() {
    const { circleData } = this.props;

    console.log('this.props', this.props)

    return (
      <div className="App">
        <button onClick={this.navigateTo('one')}>View 1</button>
        <button onClick={this.navigateTo('two')}>View 2</button>
        <button onClick={this.navigateTo('three')}>View 3</button>

        <Circles data={circleData} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    circleData: state.circleData
  };
}

export default connect(mapStateToProps)(App);
