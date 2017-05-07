const main = require('./main');

const event = {
  state: 'mi',
  billId: 'SB-0006'
};

main(event)
  .then(output => {
    console.log(output);
  });