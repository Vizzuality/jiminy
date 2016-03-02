'use strict';

import chai from 'chai';
import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

const expect = chai.expect;

describe('Charts', function() {

  describe('#constructor', () => {
    let dataset = new Dataset([ {} ]);
    let fields = new Fields(dataset);

    it('should throw an error if no argument', () => {
      expect(() => { return new Charts(); }).to.throw(Error);
    });

    it('should throw an error if called with empty array', () => {
      expect(() => { return new Charts(fields); }).to.throw(Error);
    });

    it('should not throw an error if valid dataset as argument', () => {
      dataset = new Dataset([ { name: 'Vizzuality' } ]);
      expect(() => { return new Fields(dataset); }).to.not.throw(Error);
    });

  });

});
