const assert = require('assert'),
      main = require('../main'),
      _ = require('lodash');

describe('bill fetch and parse', function() {
  const num = _.random(4001, 4300);
  let data = {
      state: 'MI',
      billId: `HB-${num}`
    };

  it('should return correct stateId', function() {
    return main(data)
      .then(results => {
        assert.equal(results[0].state_id, data.billId);
    });
  });
  it('should return a sponsor', function() {
    return main(data)
      .then(results => {
        assert.ok(results[0].sponsor);
      })
  });
  it('should have items in history', function() {
    return main(data)
      .then(results => {
        assert.ok(results[0].history.length);
      })
  });
  it('should have a commitee assignment', function() {
    return main(data)
      .then(resuts => {
        assert.ok(resuts[0].current_committee);
      });
  });
});
