'use strict';

import chai from 'chai';
import Dataset from 'dataset';
import Field from 'field';
import Fields from 'fields';

const expect = chai.expect;

describe('Fields', function() {

  describe('#constructor', () => {
    let dataset = new Dataset([ { name: 'Vizzuality', type: 'company' } ]);

    it('should throw an error if no argument', () => {
      expect(() => { return new Fields(); }).to.throw(Error);
    });

    it('should not throw an error if valid dataset as argument', () => {
      expect(() => { return new Fields(dataset); }).to.not.throw(Error);
    });

  });

  describe('#getFields', () => {
    let dataset = new Dataset([ { name: 'Vizzuality', type: 'company' } ]);
    let fields;

    before(() => {
      fields = new Fields(dataset);
    });

    it('should return an array of instances of Field', () => {
      let areInstanceOfField = fields.getFields(dataset).reduce((res, field) => {
        res = res || field instanceof Field;
        return res;
      }, false);

      expect(areInstanceOfField).to.be.true;
    });

    it('should return an array of length equal to the columns number', () => {
      expect(fields.getFields(dataset)).to.have.lengthOf(2);
    });

  });

});
