

import chai from 'chai';
import Dataset from 'dataset';
import Field from 'field';

const expect = chai.expect;

describe('StatType', () => {
  describe('#constructor', () => {
    it('should throw an error when no argument', () => {
      expect(() => { new Field(); }).to.throw(Error);
    });

    it('should throw an error when no dataset', () => {
      expect(() => { new Field('name'); }).to.throw(Error);
    });

    it('should throw an error when passing a name but an empty dataset', () => {
      expect(() => { new Field('name', []); }).to.throw(Error);
    });

    it('should not throw an error when passing a name and a dataset', () => {
      const dataset = new Dataset([{ name: 'Vizzuality' }]);

      expect(() => { new Field('name', dataset); }).to.not.throw(Error);
    });
  });
});
