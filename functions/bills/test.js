const main = require('./main'),
      _ = require('lodash');

const num = _.random(4001, 4300);
const data = {
  state: 'MI',
  billId: `HB-${num}`
};

console.log(data);

main(data)
  .then(output => {
    let d = {
      data: output[0],
      nextBill: (output[1].exists) ? output[1].id : false
    };
    console.log(d);
  });
