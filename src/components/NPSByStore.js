
import React, { Component } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeries
} from 'react-vis';

class NPSByStore extends Component {

  render() {
    return <XYPlot
      xType="ordinal"
      yDomain={[-100, 100]}
      width={500}
      height={400}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="Store" />
      <YAxis title="NPS" />
      <MarkSeries
        colorType="literal"
        sizeRange={[5, 15]}
        data={this.props.data} />
    </XYPlot>
  }

}

export default NPSByStore;