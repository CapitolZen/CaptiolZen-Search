const model = require('../utils/model'),
      rp = require('request-promise-native'),
      cheerio = require('cheerio');

module.exports = {
  ingestBillText(url){
    return new Promise((resolve, reject) => {
      rp(url)
        .then(html => {
          let $ = cheerio.load(html);
          let title = $('title').text();
          if (title.includes('Not Found')) {
            reject({error: 'Bill does not exist'});
          }

          let text = $('body').text().trim();
          text.replace(/\r\n+|\n+|\r+/g, "");

          model.bill_text = text;

          resolve(model);
        })
    });
  }
};
