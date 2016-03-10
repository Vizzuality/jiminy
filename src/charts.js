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

  constructor() {
    this._config = CONFIG;
    this._charts = this._createCharts();
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

  /* Return the available charts according to the available fields.
   * Options can contain:
   *  - allInclusive (boolean): the charts must be computed with all the columns
   *    (not just some of them)
   */
  getAvailable(fields, options) {
    let available = [];

    options = options || {};

    if(!fields || !fields.length) {
      throw new Error('Jiminy: At least one field is required to compute the available charts.');
    }

    for(let i = 0, j = this._charts.length; i < j; i++) {
      const options = {};

      if(options.allInclusive) options.allInclusive = true;

      if(this._charts[i].isAvailable(fields, options)) {
        available.push(this._charts[i]);
      }
    }

    return available;
  }

  /* Return the chart called chartName if exists, null otherwise */
  getChart(chartName) {
    for(let i = 0, j = this._charts.length; i < j; i++) {
      if(this._charts[i].name === chartName) return this._charts[i];
    }
    return null;
  }

}
