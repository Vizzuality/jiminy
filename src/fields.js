'use strict';

import Field from 'field';

export default class Fields {

  constructor(dataset) {
    if(!dataset || !dataset.valid) {
      throw new Error('Fields expects a valid dataset');
    } else {
      this._fields = this.computeFields(dataset);
    }
  }

  get fields() { return this._fields; }

  /* Return the fields of the dataset */
  computeFields(dataset) {
    let columnNames = dataset.getColumnNames();
    let fields = [];

    for(let i = 0, j = columnNames.length; i < j; i++) {
      fields.push(new Field(columnNames[i], dataset));
    }

    return fields;
  }

  /* Return the fields corresponding to each fieldNames. If one can't be found,
   * emit a warning in the console. If no one can be found, return an empty
   * array. */
  get(fieldNames) {
    let fields = [];

    for(let i = 0, j = fieldNames.length; i < j; i++) {
      let fieldName = fieldNames[i];
      let field = this._getField(fieldName);

      if(field) fields.push(field);
      else console.warn(`Unable to find the column "${fieldName}" inside the dataset.`);
    }

    return fields;
  }

  /* Return the field matching the name passed as argument if exist, null
   * otherwise */
  _getField(fieldName) {
    for(let i = 0, j = this._fields.length; i < j; i++) {
      if(this.fields[i].name === fieldName) {
        return this._fields[i];
      }
    }

    return null;
  }

};
