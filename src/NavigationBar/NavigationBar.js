import React, { Component } from 'react';
import './NavigationBar.css';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavigationBar extends Component {
  navigateTo = (route) => {
    this.props.dispatch(routeActions.push(route));
  }

  render() {
    const { pathname } = this.props.routing.location;

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/one">Company Product</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.navigateTo} activeKey={pathname}>
            <NavItem eventKey={'/one'}>One</NavItem>
            <NavItem eventKey={'/two'}>Two</NavItem>
            <NavItem eventKey={'/three'}>Three</NavItem>
            <NavItem eventKey={'/four'}>Four</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={'/profile'} href="#profile">Profile</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return { routing: state.routing };
}

export default connect(mapStateToProps)(NavigationBar);
