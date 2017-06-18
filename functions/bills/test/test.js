const assert = require('assert'),
      main = require('../main'),
      _ = require('lodash');

describe('bill fetch and parse', function() {
  const num = _.random(4001, 4500);
  let data = {
      state: 'MI',
      billId: `HB-${num}`
    };

  it('should return correct stateId', function() {
    main(data)
      .then(results => {
        assert.equal(results[0].stateId, `HB-${num}`);
        done();
    });
  });
  it('should return a sponsor', function() {
    main(data)
      .then(results => {
        let obj = JSON.parse(results[0]);
        assert.ok(obj.sponsor);
      })
  });
});
