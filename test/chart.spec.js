'use strict';

import chai from 'chai';
import Chart from 'chart';
import Dataset from 'dataset';
import Field from 'field';

const expect = chai.expect;

describe('Chart', function() {

  describe('#constructor', () => {

    it('should throw an error if no argument', () => {
      expect(() => { return new Chart(); }).to.throw(Error);
    });

    it('should throw an error if empty object argument', () => {
      expect(() => { return new Chart({}); }).to.throw(Error);
    });

    it('should throw an error if object with just name as argument', () => {
      expect(() => { return new Chart({ name: 'bar' }); }).to.throw(Error);
    });

    it('should throw an error if object with just acceptedStatTypes as argument', () => {
      expect(() => { return new Chart({ acceptedStatTypes: [] }); }).to.throw(Error);
    });

    it('should not throw an error if configuration valid as argument', () => {
      expect(() => { return new Chart({ name: 'bar', acceptedStatTypes: [] }); }).to.not.throw(Error);
    });

  });

  describe('#isAvailable', () => {
    let chart, dataset, nominal, temporal, ordinal;

    before(() => {
      chart = new Chart({ name: 'bar', acceptedStatTypes: [ ['nominal'], ['ordinal', 'temporal'] ] });
      dataset = new Dataset([{ name: 'Vizzuality', active: '5/5/2015', age: 4 }]);
      nominal = new Field('name', dataset);
      temporal = new Field('active', dataset);
      ordinal = new Field('age', dataset);
    });

    it('should return true if at least one accepted statistical types combination is found in the fields', () => {
      expect(chart.isAvailable([ nominal ])).to.be.true;
      expect(chart.isAvailable([ ordinal, temporal ])).to.be.true;
    });

    it('should return false if no accepted statistical types combination is found in the fields', () => {
      expect(chart.isAvailable([ temporal ])).to.be.false;
      expect(chart.isAvailable([ ordinal ])).to.be.false;
    });
  });

  describe('#_capitalize', () => {
    let chart;

    before(() => {
      chart = new Chart({ name: 'bar', acceptedStatTypes: [] });
    });

    it('should capitalize the first letter of a string', () => {
      expect(chart._capitalize('vizzuality')).to.equal('Vizzuality');
    });
  });

  describe('#_existFields', () => {
    let chart, dataset, fields;

    before(() => {
      chart = new Chart({ name: 'bar', acceptedStatTypes: [] });
      dataset = new Dataset([ { name: 'Vizzuality', age: 4, active: '5/5/2015' } ]);
      fields = [
        new Field('name', dataset),
        new Field('age', dataset),
        new Field('active', dataset)
      ];
    });

    it('should return the right count of statistical types among the fields', () => {
      for(let i = 0, j = fields.length; i < j; i++) {
        expect(chart._existFields(fields, fields[i].statType.name, 1)).to.be.true;
        expect(chart._existFields(fields, fields[i].statType.name, 2)).to.be.false;
      }
    });
  });

  describe('#equals', () => {
    let chart;

    before(() => {
      chart = new Chart({ name: 'bar', acceptedStatTypes: [] });
    });

    it('should return false if the JS types are different', () => {
      expect(chart.equals('hola')).to.be.false;
    });

    it('should return false if the names are different', () => {
      let chart2 = new Chart({ name: 'line', acceptedStatTypes: [] });

      expect(chart.equals(chart2)).to.be.false;
    });

    it('should return false if the acceptedStatTypes are different', () => {
      let chart2 = new Chart({ name: 'bar', acceptedStatTypes: [ ['nominal'] ] });

      expect(chart.equals(chart2)).to.be.false;
    });

    it('should return true if the charts are the same', () => {
      expect(chart.equals(chart)).to.be.true;
    });

  });

});
