'use strict';

import Chart from 'chart';

const CONFIG = [
  {
    name: 'bar',
    acceptedStatTypes: [
      [ 'nominal' ],
      [ 'ordinal' ],
      [ 'quantitative', 'nominal' ],
      [ 'quantitative', 'temporal' ],
      [ 'quantitative', 'ordinal' ]
    ]
  },
  {
    name: 'line',
    acceptedStatTypes: [
      [ 'quantitative', 'temporal' ],
      [ 'quantitative', 'ordinal' ]
    ]
  },
  {
    name: 'pie',
    acceptedStatTypes: [
      [ 'nominal' ],
      [ 'ordinal' ]
    ]
  },
  {
    name: 'scatter',
    acceptedStatTypes: [
      [ 'quantitative', 'quantitative' ],
      [ 'nominal', 'nominal' ],
      [ 'nominal', 'ordinal' ],
      [ 'ordinal', 'ordinal' ]
    ]
  },
  {
    name: '1d_scatter',
    acceptedStatTypes: [
      [ 'quantitative' ],
      [ 'temporal' ]
    ]
  },
  {
    name: '1d_tick',
    acceptedStatTypes: [
      [ 'quantitative' ],
      [ 'temporal' ]
    ]
  }
];

export default class Charts {

  constructor(fields) {
    this._config = CONFIG;
    this._charts = this._createCharts();

    if(fields && fields.fields.length > 0) {
      this._fields = fields.fields;
    } else {
      throw new Error('Charts must be instancianted with at least one field.');
    }
  }

  get charts() { return this._charts; }

  /* Create the Chart instances */
  _createCharts() {
    let charts = [];

    for(let i = 0, j = this._config.length; i < j; i++) {
      charts.push(new Chart(this._config[i]));
    }

    return charts;
  }

  getAvailable() {
    let available = [];

    for(let i = 0, j = this._charts.length; i < j; i++) {
      if(this._charts[i].isAvailable(this._fields)) {
        available.push(this._charts[i]);
      }
    }

    return available;
  }

}
