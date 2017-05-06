const main = require('./main');

const event = {
  state: 'mi',
  bill: 'SB-0006'
};

main(event)
  .then(output => {
    console.log(output);
  });