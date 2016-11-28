import React, { Component } from 'react';
import './Circles.css';

import d3 from 'd3';

class Circles extends Component {
  constructor(props) {
    super();

    this._svg = null;
  }

  componentDidMount() {
    this._svg = d3.select('svg');
    this.updateCircles(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCircles(nextProps.data);
  }

  updateCircles(data) {
    const circle = this._svg
      .selectAll('circle')
        .data(data);

    circle
      .enter()
      .append('circle');

    circle
      .transition()
      .duration(1000)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r',  (d) => d.r);
  }

  render() {
    return (
      <div>
        <svg width="720" height="120"></svg>
      </div>
    );
  }
}

export default Circles;
