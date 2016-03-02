'use strict';

import chai from 'chai';
import Dataset from 'dataset';
import Type from 'type';

const expect = chai.expect;

describe('Type', function() {

  describe('#constructor', () => {

    it('should throw an error when no argument', () => {
      expect(() => { new Type(); }).to.throw(Error);
    });

    it('should throw an error when no dataset', () => {
      expect(() => { new Type('name'); }).to.throw(Error);
    });

    it('should throw an error when passing a name but an empty dataset', () => {
      expect(() => { new new Type('name', new Dataset([])); }).to.throw(Error);
    });

    it('should not throw an error when passing a name and a valid dataset', () => {
      let dataset = new Dataset([ { name: 'Vizzuality'} ]);

      expect(() => { new Type('name', dataset); }).to.not.throw(Error);
    });

  });

  describe('#_inferType', () => {

    it('should return "string" when the column hasn\'t been found', () => {
      let fieldName = 'name';
      let dataset = new Dataset([ { location: 'Madrid' } ]);
      let type = new Type(fieldName, dataset);

      expect(type._inferType(fieldName, dataset)).to.equal('string');
    });

    it('should return "string" when no valid value', () => {
      let fieldName = 'name';
      let dataset = new Dataset([ { fieldName: null } ]);
      let type = new Type(fieldName, dataset);

      expect(type._inferType(fieldName, dataset)).to.equal('string');
    });

    it('should return the right type', () => {
      let tests = {
        string: 'Vizzuality',
        number: 3.4,
        integer: 2,
        date: '5/5/2015',
        boolean: false
      };

      for(let key in tests) {
        let dataset = new Dataset([ { name: tests[key] } ]);
        let type = new Type('name', dataset);

        expect(type._inferType('name', dataset)).to.equal(key);
      }
    });

  });

  describe('#_validValue', () => {
    let type;

    before(() => {
      type = new Type('name', new Dataset([ { name: 'Vizzuality' } ]));
    });

    it('should return false when the argument is null', () => {
      expect(type._validValue(null)).to.be.false;
    });

    it('should return false when the argument is undefined', () => {
      expect(type._validValue(undefined)).to.be.false;
    });

    it('should return false when the argument is NaN', () => {
      expect(type._validValue(NaN)).to.be.false;
    });

  });

  describe('#equals', () => {
    let type;

    before(() => {
      type = new Type('name', new Dataset([ { name: 'Vizzuality' } ]));
    });

    it('should return false if the JS types are different', () => {
      expect(type.equals('hola')).to.be.false;
    });

    it('should return false if the types are different', () => {
      let type2 = new Type('age', new Dataset([ { age: 8 } ]));

      expect(type.equals(type2)).to.be.false;
    });

    it('should return true if the types are the same', () => {
      expect(type.equals(type)).to.be.true;
    });

  });

  describe('#getters', () => {
    let tests = [
      [ 'string', 'Vizzuality' ],
      [ 'number', 3.4 ],
      [ 'integer', 2 ],
      [ 'date', '5/5/2015' ],
      [ 'boolean', false ]
    ];

    for(let i = 0, j = tests.length; i < j; i++) {
      let test = tests[i];
      let method = 'is' + (test[0])[0].toUpperCase() + test[0].slice(1, test[0].length);

      it(`${method} should return true only if the type corresponds`, () => {
        for(let k = 0, l = tests.length; k < l; k++) {
          let dataset = new Dataset([ { name: tests[k][1] } ]);
          let type = new Type('name', dataset);

          if(k === i) {
            expect(type[method]).to.be.true;
          } else {
            expect(type[method]).to.be.false;
          }
        }
      });

    }

  });

});
