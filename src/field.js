

import Type from 'type';
import StatType from 'stattype';

export default class Field {

  constructor(name, dataset) {
    if (!name || !dataset || !dataset.valid) {
      throw new Error('Jiminy: Fields must be instanciated with a name and with the ' +
       'dataset');
    }

    this._name = name;
    this._type = new Type(name, dataset);
    this._stats = this._computeStats(dataset);
    this._statType = new StatType(this._type, this._stats);
  }

  get name() { return this._name; }
  get type() { return this._type; }
  get statType() { return this._statType; }

  /* Return some statistics about the field */
  _computeStats(dataset) {
    return {
      atLeast5DistinctValues: dataset.atLeast5DistinctValues(this._name)
    };
  }

  equals(o) {
    return o.constructor && o.constructor === this.constructor &&
      o.name === this._name && o.type.equals(this._type) &&
      o.statType.equals(this._statType);
  }

}
