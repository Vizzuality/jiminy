'use strict';

import Chart from 'chart';
import StatType from 'stattype';

export default class Charts {

  constructor(config) {

    if(!config || !Array.isArray(config) || !config.length) {
      throw new Error('Jiminy: You must pass a non-empty chart configuration.');
    }

    this._config = this._parseConfig(config);
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

  /* This method is tested within the constructor */
  _parseConfig(config) {
    let charts = [];

    for(let i = 0, j = config.length; i < j; i++) {
      const chartConfig = config[i];

      if(!chartConfig.name || typeof chartConfig.name !== 'string' ||
        !chartConfig.name.length) {
        console.warn('Jiminy: Each chart must have a name.');
        continue;
      }

      if(!chartConfig.acceptedStatTypes ||
        !Array.isArray(chartConfig.acceptedStatTypes) ||
        !chartConfig.acceptedStatTypes.length) {
        console.warn('Jiminy: Each chart must have a set of rules.');
        continue;
      }

      let rules = [];

      for(let k = 0, l = chartConfig.acceptedStatTypes.length; k < l; k++) {
        const rule = chartConfig.acceptedStatTypes[k];

        if(!rule || !Array.isArray(rule) || !rule.length) {
          console.warn(`Jiminy: A rule for chart "${chartConfig.name}" ` +
            'has been ignored because invalid.');
          continue;
        }

        if(rule.length > 2) {
          console.warn(`Jiminy: A rule for chart "${chartConfig.name}" ` +
            'has been ignored because it owns more than two statistical ' +
            'types.');
          continue;
        }

        let validStatTypes = 0;

        for(let m = 0, n = rule.length; m < n; m++) {
          if(typeof rule[m] !== 'string' || !~StatType.types.indexOf(rule[m])) {
            console.warn(`Jiminy: A rule for chart "${chartConfig.name}" ` +
              'has been ignored because a statistical type isn\'t valid.');
            continue;
          }

          validStatTypes++;
        }

        if(validStatTypes === rule.length) {
          rules.push(rule.slice(0));
        }

      }

      /* We tag the chart as valid if this code has been reached and at least
       * one statistical rule is valid */
      if(rules.length > 0) {
        if(charts.filter(chart => chart.name === chartConfig.name).length) {
          console.warn('Jiminy: A chart has been ignored because it '  +
            `already exists another with name "${chartConfig.name}".`);
          continue;
        }

        charts.push({
          name: chartConfig.name,
          acceptedStatTypes: rules
        });
      }

    }

    if(!charts.length) {
      throw new Error('Jiminy: The chart configuration is empty or malformed.');
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
