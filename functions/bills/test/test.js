const assert = require('assert'),
      main = require('../main');

describe('bill fetch and parse', function() {
  let num = Math.floor(Math.random() * 5000) + 2002;
  data = {
    state: 'MI',
    billId: `HB-${num}`
  };

  it('should return correct stateId', function() {
    main(data)
      .then(results => {
        let obj = JSON.parse(results[0])
        assert.equal(obj.stateId, `HB-${num}`);
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
