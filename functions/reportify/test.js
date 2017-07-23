const main = require('./main'),
      fs = require('fs');


fs.readFile('event.json', 'utf8', (err, data) => {
  let event = JSON.parse(data);
  main(event)
    .then(msg => {
      console.log(msg);
    })
    .catch(err => {
      console.log(err);
    });
});