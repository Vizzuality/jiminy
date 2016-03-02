'use strict';

import chai from 'chai';
import Type from 'type';
import Dataset from 'dataset';
import StatType from 'stattype';

const expect = chai.expect;

describe('StatType', function() {

  describe('#constructor', () => {

    it('should throw an error when no argument', () => {
      expect(() => { new StatType(); }).to.throw(Error);
    });

    it('should throw an error when no stats', () => {
      let dataset = new Dataset([ { name: 'Vizzuality' } ]);
      let type = new Type('name', dataset);

      expect(() => { new StatType(type); }).to.throw(Error);
    });

    it('should throw an error when passing a type but an empty stat object', () => {
      let dataset = new Dataset([ { name: 'Vizzuality' } ]);
      let type = new Type('name', dataset);

      expect(() => { new StatType(type, {}); }).to.throw(Error);
    });

    it('should not throw an error when passing a type and a stat object', () => {
      let dataset = new Dataset([ { name: 'Vizzuality' } ]);
      let type = new Type('name', dataset);
      let stats = { atLeast5DistinctValues: true };

      expect(() => { new StatType(type, stats); }).to.not.throw(Error);
    });

  });

  describe('#_inferType', () => {
    let tests = [
      [
        'quantitative',
        function(type, stats) {
          return (type.isInteger || type.isNumber) &&
            stats.atLeast5DistinctValues;
        }
      ],
      [
        'nominal',
        function(type, stats) {
          return type.isBoolean || type.isString;
        }
      ],
      [
        'ordinal',
        function(type, stats) {
          return (type.isInteger || type.isNumber) &&
            !stats.atLeast5DistinctValues;
        }
      ],
      [
        'temporal',
        function(type, stats) {
          return type.isDate;
        }
      ]
    ];
    let types = [
      [ 'string', new Type('name', new Dataset([ { name: 'Vizzuality' } ])) ],
      [ 'number', new Type('name', new Dataset([ { name: 3.4 } ])) ],
      [ 'integer', new Type('name', new Dataset([ { name: 2 } ])) ],
      [ 'date', new Type('name', new Dataset([ { name: '5/5/2015' } ])) ],
      [ 'boolean', new Type('name', new Dataset([ { name: false } ])) ]
    ];

    for(let i = 0, j = types.length; i < j; i++) {
      let type = types[i];

      for(let k = 0, l = tests.length; k < l; k++) {
        let test = tests[k];
        let statType = new StatType(type[1], { atLeast5DistinctValues: true });

        if(test[1](type[1], true)) {
          it('should return the type ' + test[0] +
            ' when the type is ' + type[0] + ' and there\'s at least 5 ' +
            'different values', () => {
            expect(statType._inferType(type[1], true)).to.equal(test[0]);
          });
        } else {
          it('shouldn\'t return the type ' + test[0] +
            ' when the type is ' + type[0] + ' and there\'s at least 5 ' +
            'different values', () => {
            expect(statType._inferType(type[1], true)).to.not.equal(test[0]);
          });
        }

        statType = new StatType(type[1], { atLeast5DistinctValues: false });

        if(test[1](type[1], false)) {
          it('should return the type ' + test[0] +
            ' when the type is ' + type[0] + ' and there isn\'t at least 5 ' +
            'different values', () => {
            expect(statType._inferType(type[1], false)).to.equal(test[0]);
          });
        } else {
          it('shouldn\'t return the type ' + test[0] +
            ' when the type is ' + type[0] + ' and there isn\'t at least 5 ' +
            'different values', () => {
            expect(statType._inferType(type[1], false)).to.not.equal(test[0]);
          });
        }
      }
    }
  });

  describe('#getters', () => {
    let tests = [
      [
        'quantitative',
        new StatType(new Type('age', new Dataset([ { age: 5 } ])),
          { atLeast5DistinctValues: true })
      ],
      [
        'nominal',
        new StatType(new Type('male', new Dataset([ { male: true } ])),
          { atLeast5DistinctValues: false })
      ],
      [
        'ordinal',
        new StatType(new Type('age', new Dataset([ { age: 5 } ])),
          { atLeast5DistinctValues: false })
      ],
      [
        'temporal',
        new StatType(new Type('created', new Dataset([ { created: '5/5/2015' } ])),
          { atLeast5DistinctValues: false })
      ]
    ];

    for(let i = 0, j = tests.length; i < j; i++) {
      let test = tests[i];
      let method = 'is' + (test[0])[0].toUpperCase() + test[0].slice(1, test[0].length);

      it(`${method} should return true only if the statistical type corresponds`, () => {
        for(let k = 0, l = tests.length; k < l; k++) {
          let statType = tests[k][1];

          if(k === i) {
            expect(statType[method]).to.be.true;
          } else {
            expect(statType[method]).to.be.false;
          }
        }
      });

    }

  });

  describe('#equals', () => {
    let statType;

    before(() => {
      let dataset = new Dataset([ { name: 'Vizzuality' } ]);
      let type = new Type('name', dataset);

      statType = new StatType(type, { atLeast5DistinctValues: false });
    });

    it('should return false if the JS types are different', () => {
      expect(statType.equals('hola')).to.be.false;
    });

    it('should return false if the types are different', () => {
      let dataset = new Dataset([ { age: 3 } ]);
      let type = new Type('age', dataset);
      let statType2 = new StatType(type, { atLeast5DistinctValues: false });

      expect(statType.equals(statType2)).to.be.false;
    });

    it('should return true if the types are the same', () => {
      expect(statType.equals(statType)).to.be.true;
    });

  });

});
