'use strict';

import dl from 'datalib';
import utils from 'utils';

const TYPES = [ 'number', 'integer', 'string', 'date', 'boolean' ];

export default class Type {

  constructor(fieldName, dataset) {
    this._types = TYPES;

    if(!dl) {
      throw new Error('Jiminy: Make sure to include the dependency \'datalib\'');
    }

    if(fieldName && dataset && dataset.valid) {
      this._name = this._inferType(fieldName, dataset);
    } else {
      throw new Error('Jiminy: A type requires the dataset and the field name.');
    }

  }

  get name() { return this._name; }

  get isNumber()  { return this._types.indexOf(this._name) === 0; }
  get isInteger() { return this._types.indexOf(this._name) === 1; }
  get isString()  { return this._types.indexOf(this._name) === 2; }
  get isDate()    { return this._types.indexOf(this._name) === 3; }
  get isBoolean() { return this._types.indexOf(this._name) === 4; }

  /* Infer the type of the column by checking the first row whose value is
   * valid. If no value can be inferred, the type will be set to a string by
   * default. */
  _inferType(fieldName, dataset) {
    let sampleValue = dataset.getFirstValidValue(fieldName);

    return sampleValue !== null ? dl.type.infer([ sampleValue ]) :
      this._types[2];
  }

  /* Return true if the passed value is different from null, undefined and
   * NaN */
  _validValue(value) {
    return value !== null && value !== undefined && !utils.isNaN(value);
  }

  equals(o) {
    return o.constructor && o.constructor === this.constructor &&
      o.name === this._name;
  }

};
