'use strict';

import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

export default class Jiminy {

  constructor(json) {
    this._dataset = new Dataset(json);
    this._fields = new Fields(this._dataset);
    this._charts = new Charts(this._fields);
  }

  get name()    { return 'Jiminy'; }
  get version() { return '0.0.1'; }

  recommendation() {
    this._availableCharts = this._charts.getAvailable();
    return this._availableCharts.map(function(chart) {
      return chart.name;
    });
  }
};

module.exports = exports['default'];
