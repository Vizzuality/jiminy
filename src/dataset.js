

import utils from 'utils';

export default class Dataset {

  constructor(dataset) {
    this._data = dataset;
    if (!this.valid) {
      throw new Error('Jiminy: The dataset must be a non-empty array.');
    }
  }

  get data() { return this._data; }

  get valid() {
    return this._data && Array.isArray(this._data) && this._data.length > 0;
  }

  /* Return the first valid value of the column named fieldName */
  getFirstValidValue(fieldName) {
    for (let i = 0, j = this._data.length; i < j; i++) {
      const value = this._data[i][fieldName];

      if (this._validValue(value)) return value;
    }
    return null;
  }

  /* Return true if the column contains at least 5 different valid values */
  atLeast5DistinctValues(fieldName) {
    const values = [];

    for (let i = 0, j = this._data.length; i < j; i++) {
      const value = this._data[i][fieldName];

      if (this._validValue(value) && !~values.indexOf(value)) values.push(value);
      if (values.length >= 5) return true;
    }

    return false;
  }

  /* Return the name of the columns from the first row */
  getColumnNames() {
    const row = this._data[0];
    const columns = [];

    for (const column in row) {
      columns.push(column);
    }

    return columns;
  }

  /* Return true if the passed value is different from null, undefined and
   * NaN */
  _validValue(value) {
    return value !== null && value !== undefined && !utils.isNaN(value) &&
      !Array.isArray(value) && !(typeof value === 'object');
  }

}
