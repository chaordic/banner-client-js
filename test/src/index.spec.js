const chai = require('chai');
const expect = chai.expect;
const { getValue1 } = require('../../src');

describe('index', function() {
  it('should return value 1', function() {
    expect(getValue1()).to.be.equal(1);
  });
});
