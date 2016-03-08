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

});
