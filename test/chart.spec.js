'use strict';

import chai from 'chai';
import Chart from 'chart';
import Dataset from 'dataset';
import Fields from 'fields';
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

    it('should return false if chart can\'t be computed with all the columns inclusive and option is enabled', () => {
      expect(chart.isAvailable([ nominal, temporal ], { allInclusive: true })).to.be.false;
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

  describe('#computeUsefulFields', () => {
    let dataset,
      dataset2,
      dataset3,
      fields,
      fields2,
      fields3,
      chart,
      chart2,
      chart3,
      nominal,
      ordinal,
      quantitative,
      temporal;

    before(() => {
      dataset = new Dataset([ { name: 'Vizzuality', age: 4 } ]);
      fields = new Fields(dataset);
      chart = new Chart({ name: 'bar', acceptedStatTypes: [
        [ 'nominal' ],
        [ 'quantitative', 'temporal' ],
        [ 'temporal' ],
        [ 'quantitative', 'ordinal' ]
      ]});

      dataset2 = new Dataset([
        { name: 'Vizzuality', age: 4, active: '5/5/2015', points: 1 },
        { name: 'Vizzuality', age: 4, active: '5/5/2015', points: 2 },
        { name: 'Vizzuality', age: 4, active: '5/5/2015', points: 3 },
        { name: 'Vizzuality', age: 4, active: '5/5/2015', points: 4 },
        { name: 'Vizzuality', age: 4, active: '5/5/2015', points: 5 }
      ]);
      fields2 = new Fields(dataset2);
      chart2 = new Chart({ name: 'line', acceptedStatTypes: [
        [ 'nominal' ],
        [ 'quantitative', 'temporal' ]
      ]});
      nominal = fields2.get([ 'name' ])[0];
      ordinal = fields2.get([ 'age' ])[0];
      quantitative = fields2.get([ 'points' ])[0];
      temporal = fields2.get([ 'active' ])[0];

      dataset3 = new Dataset([
        { name: 'Vizzuality', surname: 'Vizz' }
      ]);
      fields3 = new Fields(dataset3);
      chart3 = new Chart({ name: 'mychart', acceptedStatTypes: [
        [ 'nominal', 'nominal' ]
      ]});
    });

    it('should return only the fields that can be used to render the chart', () => {
      /* The last rule isn't satisfied as there's no quantitive column */
      expect(chart.computeUsefulFields(fields.fields).length).to.equals(1);
    });

    it('should return an empty array if a column is passed and just one column is need to render the chart', () => {
      expect(chart2.computeUsefulFields(fields2.fields, nominal).length).to.equals(0);
    });

    it('should not throw any error if the chart can\'t be rendered with the passed column', () => {
      expect(() => { return chart2.computeUsefulFields(fields2.fields, ordinal); }).to.not.throw(Error);
    });

    it('should return an empty array if the chart can\'t be rendered with the passed column', () => {
      expect(chart2.computeUsefulFields(fields2.fields, ordinal).length).to.equals(0);
    });

    it('should return only the fields that can be used for the second column to render the chart', () => {
      expect(chart2.computeUsefulFields(fields2.fields, quantitative)).to.deep.equals([ temporal ]);
    });

    it('should not return the field passed as argument', () => {
      expect(chart3.computeUsefulFields(fields3.fields, fields3.get([ 'name' ])[0]).length).to.equals(1);
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
