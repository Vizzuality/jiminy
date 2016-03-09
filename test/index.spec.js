'use strict';

import chai from 'chai';
import Jiminy from 'index';

const expect = chai.expect;

describe('Jiminy', function() {

  describe('#recommendation', () => {
    let data = [
      { name: 'Vizzuality' }
    ];
    let jiminy = new Jiminy(data);

    it('should not throw any error if no argument or null or undefined', () => {
      expect(() => { return jiminy.recommendation(); }).to.not.throw(Error);
      expect(() => { return jiminy.recommendation(null); }).to.not.throw(Error);
      expect(() => { return jiminy.recommendation(undefined); }).to.not.throw(Error);
    });

    it('should not throw any error if argument is array', () => {
      expect(() => { return jiminy.recommendation([ 'name' ]); }).to.not.throw(Error);
    });

    it('should not throw any error if argument is empty array', () => {
      expect(() => { return jiminy.recommendation([]); }).to.not.throw(Error);
    });

    it('should throw an error if argument is anything but an array', () => {
      expect(() => { return jiminy.recommendation(1); }).to.throw(Error);
      expect(() => { return jiminy.recommendation(false); }).to.throw(Error);
      expect(() => { return jiminy.recommendation({}); }).to.throw(Error);
    });

    it('should not throw any error if the columns doesn\'t exist', () => {
      expect(() => { return jiminy.recommendation([ 'age' ]); }).to.not.throw(Error);
    });

    it('should return the same result as if there were no argument if all columns don\'t exist', () => {
      expect(jiminy.recommendation([ 'age' ])).to.deep.equal(jiminy.recommendation());
    });

  });

  describe('#columns', () => {
    let data = [
      { name: 'Vizzuality' }
    ];
    let data2 = [
      { name: 'Vizzuality',  active: '5/5/2015' }
    ];
    let jiminy = new Jiminy(data);
    let jiminy2 = new Jiminy(data2);

    it('should throw an error if no argument or null or undefined or not a string', () => {
      expect(() => { return jiminy.columns(); }).to.throw(Error);
      expect(() => { return jiminy.columns(undefined); }).to.throw(Error);
      expect(() => { return jiminy.columns(null); }).to.throw(Error);
      expect(() => { return jiminy.columns([]); }).to.throw(Error);
      expect(() => { return jiminy.columns([ 'Vizzuality' ]); }).to.throw(Error);
      expect(() => { return jiminy.columns(1); }).to.throw(Error);
      expect(() => { return jiminy.columns(true); }).to.throw(Error);
    });

    it('should throw an error the chart doesn\'t exist', () => {
      expect(() => { return jiminy.columns('Vizzuality'); }).to.throw(Error);
    });

    it('should not throw any error if the chart exists', () => {
      expect(() => { return jiminy.columns('scatter'); }).to.not.throw(Error);
    });

    it('should return an empty array if the chart can\'t be rendered with the dataset\'s fields', () => {
      expect(jiminy.columns('1d_tick')).to.deep.equals([]);
    });

    it('should return an empty array if the chart needs a second columns the dataset doesn\'t have', () => {
      expect(jiminy.columns('scatter')).to.deep.equals([]);
    });

    it('should return the only the columns that can be used to render the chart', () => {
      expect(jiminy2.columns('pie')).to.deep.equals([ 'name' ]);
    });

  });

});
