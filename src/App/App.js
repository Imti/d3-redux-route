import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import NavigationBar from '../NavigationBar/NavigationBar';

class App extends Component {
  render() {
    const { main, side } = this.props;

    return (
      <div className="App">
        <NavigationBar />
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
