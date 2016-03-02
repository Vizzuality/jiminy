'use strict';

import chai from 'chai';
import utils from 'utils';

const expect = chai.expect;

describe('utils', function() {

  describe('#isNaN', () => {

    it('should return true if argument is NaN', () => {
      expect(utils.isNaN(NaN)).to.be.true;
    });

    it('should return false if argument is a string', () => {
      expect(utils.isNaN('Vizzuality')).to.be.false;
    });

  });

});
