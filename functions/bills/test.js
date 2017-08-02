const main = require('./main'),
      _ = require('lodash'),
      fs = require('fs');

fs.readFile('./event.json', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    data = JSON.parse(data);
    main(data)
      .then(results => {
        console.log(results);
      })
  }
});
