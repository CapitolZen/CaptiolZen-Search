const main = require('./main');

const event = {
  state: 'mi',
  billId: 'SB-0006'
};

main(event)
  .then(output => {
    let data = {
      data: output[0],
      nextBill: (output[1].exists) ? output[1].id : false
    };
    console.log(output);
  });