'use strict';

import chai from 'chai';
import Dataset from 'dataset';
import Fields from 'fields';
import Charts from 'charts';

const expect = chai.expect;

describe('Charts', function() {

  describe('#constructor', () => {
    it('should throw an error if no argument', () => {
      expect(() => { return new Charts(); }).to.throw(Error);
    });

    it('should throw an error if argument isn\'t an array or is an empty array', () => {
      expect(() => { return new Charts(1); }).to.throw(Error);
      expect(() => { return new Charts(false); }).to.throw(Error);
      expect(() => { return new Charts({ name: 'Vizzuality' }); }).to.throw(Error);
      expect(() => { return new Charts(undefined); }).to.throw(Error);
      expect(() => { return new Charts(null); }).to.throw(Error);
      expect(() => { return new Charts([]); }).to.throw(Error);
    });

    describe('#_parseConfig', () => {
      it('should not throw any error if the configuration object is partly malformed', () => {
        const config = [
          'Vizzuality',
          {
            name: 123
          },
          {
            name: 'Test',
            acceptedStatTypes: [ [ 'nominal' ] ]
          }
        ];

        expect(() => { return new Charts(config); }).to.not.throw(Error);
      });

      it('should add once two charts with the same name and not throw any error', () => {
        const config = [
          {
            name: 'Test',
            acceptedStatTypes: [ [ 'nominal' ] ]
          },
          {
            name: 'Test',
            acceptedStatTypes: [ [ 'nominal' ] ]
          }
        ];

        expect(() => { return new Charts(config); }).to.not.throw(Error);
        expect(new Charts(config).charts.length).to.equals(1);
      });

      it('should throw an error if the configuration is empty or all malformed', () => {
        const configs = [
          [],
          [
            'Vizzuality'
          ],
          [
            {
              name: 345,
              acceptedStatTypes: [ [ 'nominal' ] ]
            }
          ],
          [
            {
              name: '',
              acceptedStatTypes: [ [ 'nominal' ] ]
            }
          ],
          [
            {
              name: 'Vizzuality'
            }
          ],
          [
            {
              name: 'Vizzuality',
              acceptedStatTypes: null
            }
          ],
          [
            {
              name: 'Vizzuality',
              acceptedStatTypes: {}
            }
          ],
          [
            {
              name: 'Vizzuality',
              acceptedStatTypes: []
            }
          ],
          [
            {
              name: 'Vizzuality',
              acceptedStatTypes: [ 'Vizzuality' ]
            }
          ],
          [
            {
              name: 'Vizzuality',
              acceptedStatTypes: [ [ 'Vizzuality' ] ]
            }
          ]
        ];

        for(let i = 0, j = configs.length; i < j; i++) {
          expect(() => { return new Charts(configs[i]); }).to.throw(Error);
        }

      });
    });

  });

  describe('#getAvailable', () => {
    let dataset = new Dataset([ {} ]);
    let fields = new Fields(dataset);
    let charts = new Charts([ {
      name: 'bar',
      acceptedStatTypes: [ [ 'nominal' ] ]
    } ]);

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

  describe('#getChart', () => {
    let charts = new Charts([ {
      name: 'bar',
      acceptedStatTypes: [ [ 'nominal' ] ]
    } ]);

    it('should return null if the chart name doesn\'t exist', () => {
      expect(charts.getChart('Vizzuality')).to.equals(null);
    });

    it('should return true if the chart name exists', () => {
      const chart = charts._charts[0];

      expect(charts.getChart(chart.name)).to.be.deep.equals(chart);
    });
  });

});
