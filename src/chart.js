'use strict';

export default class Chart {

  constructor(config) {
    if(!config || !config.hasOwnProperty('name') ||
      !config.hasOwnProperty('acceptedStatTypes')) {
      throw new Error('Charts must be instanciated with a correct ' +
       'configuration ie. with a name and a list of accepted statistical ' +
       'types.');
    } else {
      this._name = config.name;
      this._acceptedStatTypes = config.acceptedStatTypes;
    }
  }

  get name() { return this._name; }
  get acceptedStatTypes() { return this._acceptedStatTypes; }

  /* Return true if the chart can be rendered depending on the fields available
   * and the statistical types required by the chart */
  isAvailable(fields) {
    let available = false;

    for(let i = 0, j = this._acceptedStatTypes.length; i < j; i++) {
      let condition = this._acceptedStatTypes[i];

      /* If the requirement is just one statistical type  */
      if(condition.length === 1) {
        available = this._existFields(fields, condition[0], 1);
      } else {
        /* If the requirement are two same statistical types */
        if(condition[0] === condition[1]) {
          available = this._existFields(fields, condition[0], 2);

        /* If the requirement are two different statistical types */
        } else {
          available = this._existFields(fields, condition[0], 1) &&
            this._existFields(fields, condition[1], 1);
        }
      }

      if(available) break;
    }

    return available;
  }

  /* Return the string with its first letter capitalized */
  _capitalize(string) {
    return string ? string[0].toUpperCase() + string.slice(1, string.length) :
      string;
  }

  /* Return true if among the fields, there are at least count ones of the
   * specified statistical type */
  _existFields(fields, statTypeName, count) {
    return fields.filter(function(field) {
      return field.statType['is' + this._capitalize(statTypeName)];
    }.bind(this)).length >= count;
  }

  equals(o) {
    return o.constructor && o.constructor === this.constructor &&
      o.name === this._name &&
      o.acceptedStatTypes === this._acceptedStatTypes;
  }

};
