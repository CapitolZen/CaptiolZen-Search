const main = require('./main'),
      dotenv = require('dotenv').config(),
      _ = require('lodash');

const num = _.random(4001, 4300);
const data = {
  state: 'MI',
  billId: `SB-0100`
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
