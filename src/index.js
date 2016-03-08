'use strict';

import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

export default class Jiminy {

  constructor(json) {
    this._dataset = new Dataset(json);
    this._fields = new Fields(this._dataset);
  }

  get name()    { return 'Jiminy'; }
  get version() { return '0.0.1'; }

  /* If fieldNames is present, only return the charts that can be obtained by
   * the combination of the passed column names. Otherwise, return the types of
   * charts that can be obtained with any of the columns of the dataset.
   * NOTE: if fieldNames is set and contains several names, it won't return the
   * charts obtained with just one of the specified columns. */
  recommendation(fieldNames) {
    let fields = [];
    let allColumnsInclusive = false; /* All the columns must be used */

    if(fieldNames !== null && fieldNames !== undefined) {
      if(!Array.isArray(fieldNames)) {
        throw new Error('recommendation should be called without any parameter or with an array of column names.');
      } else if(fieldNames.length) {
        allColumnsInclusive = true;
        fields = this._fields.get(fieldNames);
      }
    }

    if(!fields.length) fields = this._fields.fields;

    const options = {
      allInclusive: allColumnsInclusive
    };

    this._availableCharts = new Charts().getAvailable(fields, options);
    return this._availableCharts.map(function(chart) {
      return chart.name;
    });
  }
};

module.exports = exports['default'];
