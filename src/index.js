'use strict';

import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

export default class Jiminy {

  constructor(json, chartConfig) {
    this._dataset = new Dataset(json);
    this._fields = new Fields(this._dataset);
    this._charts = new Charts(chartConfig);
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
        throw new Error('Jiminy: recommendation should be called without any ' +
          'parameter or with an array of column names.');
      } else if(fieldNames.length) {
        allColumnsInclusive = true;
        fields = this._fields.get(fieldNames);
      }
    }

    if(!fields.length) fields = this._fields.fields;

    const options = {
      allInclusive: allColumnsInclusive
    };

    this._availableCharts = this._charts.getAvailable(fields, options);
    return this._availableCharts.map(function(chart) {
      return chart.name;
    });
  }

  /* Return the columns that can be used to compute the chart. If chartName
   * doesn't correspond to any chart or isn't available, throw an error. */
  columns(chartName, columnName) {
    if(!chartName) {
      throw new Error('Jiminy: columns expects the name of the chart as first argument.');
    }

    const chart = this._charts.getChart(chartName);

    if(!chart) {
      throw new Error(`${chartName} isn't a valid chart name. ` +
        'Check the documentation to see existing types of charts.');
    }

    if(columnName !== null && columnName !== undefined &&
      typeof columnName !== 'string') {
      throw new Error('Jiminy: The second parameter of columns must be a string.');
    }

    /* We want the suggestions for the first column */
    if(!columnName) {
      return chart.computeUsefulFields(this._fields.fields).map((field) => {
        return field.name;
      });
    }

    /* We want the suggestions for the second one */

    /* We check if the name of the column exists */
    if(!~this._dataset.getColumnNames().indexOf(columnName)) {
      throw new Error(`Unable to find the column "${columnName}" inside the dataset`);
    }

    const field = this._fields.get([ columnName ])[0];

    return chart.computeUsefulFields(this._fields.fields, field).map((field) => {
      return field.name;
    });

  }
};

module.exports = exports['default'];
