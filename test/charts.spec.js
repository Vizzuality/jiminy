'use strict';

import chai from 'chai';
import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

const expect = chai.expect;

describe('Charts', function() {

  describe('#getAvailable', () => {
    let dataset = new Dataset([ {} ]);
    let fields = new Fields(dataset);
    let charts = new Charts();

    it('should throw an error if no argument', () => {
      expect(() => { return charts.getAvailable(); }).to.throw(Error);
    });

    it('should throw an error if called with empty array', () => {
      expect(() => { return charts.getAvailable(fields.fields); }).to.throw(Error);
    });

    it('should not throw an error if fields as argument', () => {
      dataset = new Dataset([ { name: 'Vizzuality' } ]);
      fields = new Fields(dataset);
      expect(() => { return charts.getAvailable(fields.fields); }).to.not.throw(Error);
    });

  });

});
