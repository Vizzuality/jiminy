'use strict';

import Field from 'field';

export default class Fields {

  constructor(dataset) {
    if(!dataset || !dataset.valid) {
      throw new Error('Fields expects a valid dataset');
    } else {
      this._fields = this.getFields(dataset);
    }
  }

  get fields() { return this._fields; }

  /* Return the fields of the dataset */
  getFields(dataset) {
    let columnNames = dataset.getColumnNames();
    let fields = [];

    for(let i = 0, j = columnNames.length; i < j; i++) {
      fields.push(new Field(columnNames[i], dataset));
    }

    return fields;
  }

};
