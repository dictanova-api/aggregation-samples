import React, { Component } from 'react';
import APIClient from './APIClient.js';
import './App.css';

import NPSByStore from './components/NPSByStore.js'
import NPSByStoreAndMonth from './components/NPSByStoreAndMonth.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.client = new APIClient();
    this.state = {
      npsByScoreData: [],
      npsByScoreAndMonthData : {}
    };
  }

  componentDidMount() {

    const that = this;

    
    that.client.npsScoreByStore().then(function (result) {

      const npsByScoreData = [];
      result.periods[0].values.forEach((value) => {
        npsByScoreData.push({
          x: value.dimensions[0],
          y: value.value,
          size: value.volume,
          color : value.value > 50 ? 'green' : value.value > 0 ? 'orange' : 'red'
        });
      });

      that.setState({ npsByScoreData: npsByScoreData });

    });

    
    that.client.npsScoreByStoreAndMonth().then(function (result) {

      const npsByScoreAndMonthData = [];
      result.periods[0].values.forEach((value) => {

        if(!npsByScoreAndMonthData[value.dimensions[0]]) {
          npsByScoreAndMonthData[value.dimensions[0]] = [];
        }

        npsByScoreAndMonthData[value.dimensions[0]].push({
          x: value.dimensions[1],
          y: value.value
        });

      });

      that.setState({ npsByScoreAndMonthData: npsByScoreAndMonthData });

    });

  }

  render() {
    return (
      <div className="App">
        <NPSByStore data={this.state.npsByScoreData} />
        <NPSByStoreAndMonth data={this.state.npsByScoreAndMonthData} />
      </div>
    );
  }
}

export default App;
