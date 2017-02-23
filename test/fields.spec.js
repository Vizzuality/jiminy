

import chai from 'chai';
import Dataset from 'dataset';
import Field from 'field';
import Fields from 'fields';

const expect = chai.expect;

describe('Fields', () => {
  describe('#constructor', () => {
    const dataset = new Dataset([{ name: 'Vizzuality', type: 'company' }]);

    it('should throw an error if no argument', () => {
      expect(() => new Fields()).to.throw(Error);
    });

    it('should not throw an error if valid dataset as argument', () => {
      expect(() => new Fields(dataset)).to.not.throw(Error);
    });
  });

  describe('#computeFields', () => {
    const dataset = new Dataset([{ name: 'Vizzuality', type: 'company' }]);
    let fields;

    before(() => {
      fields = new Fields(dataset);
    });

    it('should return an array of instances of Field', () => {
      const areInstanceOfField = fields.computeFields(dataset).reduce((res, field) => {
        res = res || field instanceof Field;
        return res;
      }, false);

      expect(areInstanceOfField).to.be.true;
    });

    it('should return an array of length equal to the columns number', () => {
      expect(fields.computeFields(dataset)).to.have.lengthOf(2);
    });
  });

  describe('#get', () => {
    const dataset = new Dataset([{ name: 'Vizzuality', active: true }]);
    let fields;

    before(() => {
      fields = new Fields(dataset);
    });

    it('should return the field if exist', () => {
      expect(fields.get(['name']).length).to.equal(1);
      expect(fields.get(['name'])[0]).to.deep.equal(fields.fields[0]);
    });

    it('should return an empty array if no field could be found', () => {
      expect(fields.get(['age'])).to.deep.equal([]);
    });
  });

  describe('#_getField', () => {
    const dataset = new Dataset([{ name: 'Vizzuality', active: true }]);
    let fields;

    before(() => {
      fields = new Fields(dataset);
    });

    it('should return the field if exist', () => {
      expect(fields._getField('name')).to.deep.equal(fields.fields[0]);
    });

    it('should return an null if no field could be found', () => {
      expect(fields._getField('age')).to.deep.equal(null);
    });
  });
});
