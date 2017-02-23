

import chai from 'chai';
import Jiminy from 'index';

const expect = chai.expect;

describe('Jiminy', () => {
  describe('#recommendation', () => {
    const data = [
      { name: 'Vizzuality' }
    ];
    const jiminy = new Jiminy(data, [
      { name: 'bar', acceptedStatTypes: [['nominal']] }
    ]);

    it('should not throw any error if no argument or null or undefined', () => {
      expect(() => jiminy.recommendation()).to.not.throw(Error);
      expect(() => jiminy.recommendation(null)).to.not.throw(Error);
      expect(() => jiminy.recommendation(undefined)).to.not.throw(Error);
    });

    it('should not throw any error if argument is array', () => {
      expect(() => jiminy.recommendation(['name'])).to.not.throw(Error);
    });

    it('should not throw any error if argument is empty array', () => {
      expect(() => jiminy.recommendation([])).to.not.throw(Error);
    });

    it('should throw an error if argument is anything but an array', () => {
      expect(() => jiminy.recommendation(1)).to.throw(Error);
      expect(() => jiminy.recommendation(false)).to.throw(Error);
      expect(() => jiminy.recommendation({})).to.throw(Error);
    });

    it('should not throw any error if the columns doesn\'t exist', () => {
      expect(() => jiminy.recommendation(['age'])).to.not.throw(Error);
    });

    it('should return the same result as if there were no argument if all columns don\'t exist', () => {
      expect(jiminy.recommendation(['age'])).to.deep.equal(jiminy.recommendation());
    });
  });

  describe('#columns', () => {
    const chartConfig = [
      {
        name: 'bar',
        acceptedStatTypes: [
          ['nominal'],
          ['ordinal'],
          ['quantitative', 'nominal'],
          ['quantitative', 'temporal'],
          ['quantitative', 'ordinal']
        ]
      },
      {
        name: 'line',
        acceptedStatTypes: [
          ['quantitative', 'temporal'],
          ['quantitative', 'ordinal']
        ]
      },
      {
        name: 'pie',
        acceptedStatTypes: [
          ['nominal'],
          ['ordinal']
        ]
      },
      {
        name: 'scatter',
        acceptedStatTypes: [
          ['quantitative', 'quantitative'],
          ['nominal', 'nominal'],
          ['nominal', 'ordinal'],
          ['ordinal', 'ordinal']
        ]
      },
      {
        name: '1d_scatter',
        acceptedStatTypes: [
          ['quantitative'],
          ['temporal']
        ]
      },
      {
        name: '1d_tick',
        acceptedStatTypes: [
          ['quantitative'],
          ['temporal']
        ]
      }
    ];

    const data = [
      { name: 'Vizzuality' }
    ];
    const data2 = [
      { name: 'Vizzuality', active: '5/5/2015' }
    ];
    const data3 = [
      { name: 'Vizzuality', work: 'engineer', level: 1 }
    ];
    const jiminy = new Jiminy(data, chartConfig);
    const jiminy2 = new Jiminy(data2, chartConfig);
    const jiminy3 = new Jiminy(data3, chartConfig);

    it('should throw an error if no argument or null or undefined or not a string', () => {
      expect(() => jiminy.columns()).to.throw(Error);
      expect(() => jiminy.columns(undefined)).to.throw(Error);
      expect(() => jiminy.columns(null)).to.throw(Error);
      expect(() => jiminy.columns([])).to.throw(Error);
      expect(() => jiminy.columns(['Vizzuality'])).to.throw(Error);
      expect(() => jiminy.columns({ name: 'Vizzuality' })).to.throw(Error);
      expect(() => jiminy.columns(1)).to.throw(Error);
      expect(() => jiminy.columns(true)).to.throw(Error);
    });

    it('should throw an error the chart doesn\'t exist', () => {
      expect(() => jiminy.columns('Vizzuality')).to.throw(Error);
    });

    it('should not throw any error if the chart exists', () => {
      expect(() => jiminy.columns('scatter')).to.not.throw(Error);
    });

    it('should return an empty array if the chart can\'t be rendered with the dataset\'s fields', () => {
      expect(jiminy.columns('1d_tick')).to.deep.equals([]);
    });

    it('should return an empty array if the chart needs a second columns the dataset doesn\'t have', () => {
      expect(jiminy.columns('scatter')).to.deep.equals([]);
    });

    it('should return the only the columns that can be used to render the chart', () => {
      expect(jiminy2.columns('pie')).to.deep.equals(['name']);
    });

    it('should not throw an error if the second argument is omitted, undefined or null', () => {
      expect(() => jiminy.columns('scatter', undefined)).to.not.throw(Error);
      expect(() => jiminy.columns('scatter', null)).to.not.throw(Error);
    });

    it('should throw an error if the second argument is present and not a string', () => {
      expect(() => jiminy.columns('scatter', false)).to.throw(Error);
      expect(() => jiminy.columns('scatter', ['Vizzuality'])).to.throw(Error);
      expect(() => jiminy.columns('scatter', { name: 'Vizzuality' })).to.throw(Error);
      expect(() => jiminy.columns('scatter', 1)).to.throw(Error);
    });

    it('should throw an error if the second argument is not an existing column', () => {
      expect(() => jiminy.columns('scatter', 'size')).to.throw(Error);
    });

    it('should not throw an error if the second argument is an existing column', () => {
      expect(() => jiminy.columns('scatter', 'name')).to.not.throw(Error);
    });

    it('should return an empty array if the dataset just has one column', () => {
      expect(jiminy.columns('pie', 'name')).to.deep.equals([]);
    });

    it('should return the right available columns for the second choice', () => {
      expect(jiminy3.columns('scatter', 'name')).to.deep.equals(['work', 'level']);
    });
  });
});
