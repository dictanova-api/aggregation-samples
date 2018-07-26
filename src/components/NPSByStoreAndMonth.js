
import React, { Component } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend
} from 'react-vis';

class NPSByStoreAndMonth extends Component {

  render() {
    const that = this;
    console.log('call', that.props);
    return <XYPlot
      xType="ordinal"
      yDomain={[-100, 100]}
      width={500}
      height={400}>
      <DiscreteColorLegend items={Object.keys(that.props.data)} orientation="horizontal" />
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="Store" />
      <YAxis title="NPS" />
      {Object.keys(that.props.data).map(function (dataSeries, i) {
        return <LineSeries
          key={'line-series-' + i}
          data={that.props.data[dataSeries]}
          style={{ strokeLinejoin: "round" }} />
      })}
    </XYPlot>
  }

}

export default NPSByStoreAndMonth;