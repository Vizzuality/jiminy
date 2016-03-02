'use strict';

import chai from 'chai';
import Dataset from 'dataset';

const expect = chai.expect;

describe('Dataset', function() {

  describe('#constructor', () => {

    it('should throw an error if no argument', () => {
      expect(() => { return new Dataset(); }).to.throw(Error);
    });

    it('should throw an error if argument isn\'t an array', () => {
      expect(() => { return new Dataset('Vizzuality'); }).to.throw(Error);
      expect(() => { return new Dataset(5); }).to.throw(Error);
      expect(() => { return new Dataset({}); }).to.throw(Error);
      expect(() => { return new Dataset(() => {}); }).to.throw(Error);
    });

    it('should throw an error if array is empty', () => {
      expect(() => { return new Dataset([]); }).to.throw(Error);
    });

    it('should not throw an error if the dataset is valid', () => {
      expect(() => { return new Dataset([ { name: 'Vizzuality' } ]); }).to.not.throw(Error);
    });

  });

  describe('getFirstValidValue', () => {
    let data = [
      { name: undefined, employees: null      },
      { name: null,      employees: undefined },
      { name: NaN,       employees: null      },
      { name: undefined, employees: null      },
      { name: null,      employees: 1         }
    ];
    let dataset = new Dataset(data);

    it('should return null if no valid value in a column', () => {
      expect(dataset.getFirstValidValue('name')).to.equal(null);
    });

    it('should return the first valid value', () => {
      expect(dataset.getFirstValidValue('employees')).to.equal(1);
    });

  });

  describe('#atLeast5DistinctValues', () => {
    let data = [
      { name: 'Vizzuality', employees: 1 },
      { name: 'Vizzuality', employees: 2 },
      { name: 'Vizzuality', employees: 3 },
      { name: 'Vizzuality', employees: 4 },
      { name: 'Vizzuality', employees: 5 }
    ];
    let dataset = new Dataset(data);

    it('should return false if a column has less than 5 different values', () => {
      expect(dataset.atLeast5DistinctValues('name')).to.be.false;
    });

    it('should return true if a column has at least 5 different values', () => {
      expect(dataset.atLeast5DistinctValues('employees')).to.be.true;
    });

  });

  describe('#getColumnNames', () => {
    let data = [ { name: 'Vizzuality', active: true } ];
    let dataset = new Dataset(data);

    it('should return the columns of the dataset', () => {
      let res = Object.keys(data[0]);

      expect(dataset.getColumnNames()).to.deep.equal(res);
    });
  });

  describe('#_validValue', () => {
    let dataset;

    before(() => {
      dataset = new Dataset([{ name: 'Vizzuality' }]);
    });

    it('should return false when value is undefined', () => {
      expect(dataset._validValue(undefined)).to.be.false;
    });

    it('should return false when the value is null', () => {
      expect(dataset._validValue(null)).to.be.false;
    });

    it('should return false when the value is NaN', () => {
      expect(dataset._validValue(NaN)).to.be.false;
    });

    it('should return false when the value is an array', () => {
      expect(dataset._validValue([ 'Vizzuality' ])).to.be.false;
    });

    it('should retuen false when the value is an object', () => {
      expect(dataset._validValue({ name: 'Vizzuality' })).to.be.false;
    });

    it('should return true for a string, a number or a boolean', () => {
      expect(dataset._validValue(false)).to.be.true;
      expect(dataset._validValue('Vizzuality')).to.be.true;
      expect(dataset._validValue(3)).to.be.true;
    });

  });

});
