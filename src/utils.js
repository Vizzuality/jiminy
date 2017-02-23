

export default {

  /* More robust version of isNaN
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
   */
  isNaN(value) {
    if (Number.isNaN) {
      return Number.isNaN(value);
    }

    return typeof value === 'number' && isNaN(value);
  }

};
