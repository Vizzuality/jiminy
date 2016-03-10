'use strict';

const TYPES = [ 'quantitative', 'nominal', 'ordinal', 'temporal' ];

export default class StatType {

  /* An instance can be created or with a type (number, string, etc.) and stats
   * about that column, or directly the name of the statistical type */
  constructor(type, stats) {
    this._types = TYPES;

    if(type && stats && stats.hasOwnProperty('atLeast5DistinctValues')) {
      this._name = this._inferType(type, stats);
    } else {
      throw new Error('Jiminy: Statistical types must be instanciated with the ' +
        'field\'s type and the stats.');
    }
  }

  get types() { return this._types; }
  get name() { return this._name; }

  get isQuantitative() { return this._name === this._types[0]; }
  get isNominal()      { return this._name === this._types[1]; }
  get isOrdinal()      { return this._name === this._types[2]; }
  get isTemporal()     { return this._name === this._types[3]; }

  /* Infer the statistical type depending on the type of data and the statistics
   * of the field */
  _inferType(type, stats) {
    let statType = this._types[2];

    if(type.isBoolean || type.isString) {
      statType = this._types[1];
    } else if(type.isDate) {
      statType = this._types[3];
    } else if((type.isNumber || type.isInteger) &&
      stats.atLeast5DistinctValues) {
      statType = this._types[0];
    }

    return statType;
  }

  equals(o) {
    return o.constructor && o.constructor === this.constructor &&
      o.name === this._name;
  }

};
