const main = require('./main'),
      dotenv = require('dotenv').config(),
      _ = require('lodash'),
      fs = require('fs');

fs.readFile('./event.json', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    main(data)
      .then(results => {
        console.log(results);
      })
  }
});
