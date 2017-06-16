const main = require('./main');

const event = {
  state: 'MI',
  billId: 'HB-4001'
};

main(event)
  .then(output => {
    let data = {
      data: output[0],
      nextBill: (output[1].exists) ? output[1].id : false
    };
    console.log(output);
  });
