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

          let pages = $('div[class^="WordSection"]');
          let text = [];
          pages.each(p => {
            text.push($(this).text());
          });

          model.bill_text = text.join('\n');

          resolve(model);
        })
    });
  }
};
