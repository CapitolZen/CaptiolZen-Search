const cheerio = require('cheerio'),
      async = require('async'),
      moment = require('moment'),
      rp = require('request-promise-native'),
      utils = require('../utils'),
      model = require('../utils/model');

module.exports = {
  statusfizer: {
    'read a first time': 'reading-1',
    'read a second time': 'reading-2',
    'read a third time': 'reading-3',
    'introduced by': 'introduction',
    'passed': 'passage',
    'referred to committee': 'referral-committee',
    'reported': 'committee-passage',
    'received': 'introduction',
    'presented to governor': 'executive-receipt',
    'presented to the governor': 'executive-receipt',
    'approved by governor': 'executive-signature',
    'approved by the governor': 'executive-signature',
    'adopted': 'passage',
    'amendment(s) adopted': 'amendment-passage',
    'amendment(s) defeated': 'amendment-failure',
  },
  billTypes: {
    'B': 'bill',
    'R': 'resolution',
    'CR': 'concurrent resolution',
    'JR': 'joint resolution'
  },
  chamberBillTypes: {
    upper: [{'SB': 1}, {'SR': 1}, {'SCR': 1}, {'SJR': 1}],
    lower: [{'HR': 4000}, {'HR': 1}, {'HCR': 1}, {'HJR': 1}]
  },
  billList: '/mileg.aspx?page=Bills',
  billDetail: '/doc.aspx?2017-HB-4249',
  baseUrl: 'http://www.legislature.mi.gov',
  currentSession: '2017',

  getBillDetailUrl(id) {
    //let clean = id.replace(' ', '-');
    return `${this.baseUrl}${this.billDetail}${this.currentSession}-${id}`;
  },

  /**
   * Making the magic happen
   * @param  {string} id bill id
   * @return {Promise}    A promise that resolves an object containing bill data
   */
  parseBillSummary(id) {
    return new Promise((resolve, reject) => {
      let url = this.getBillDetailUrl(id);
      let sf = this.statusfizer;
      rp(url)
        .then(html => {

          $ = cheerio.load(html);
          // Handle sponsors
          console.log('sponsors');
          $('#frg_billstatus_SponsorList > a').each(function(i) {
            console.log(i);
            let name = $(this).text();
            console.log(name);
            if (i === 0) {
              model.sponsor = name;
            } else {
              model.addCosponsor(name);
            }

          });

          // Handle summary
          model.summary = $('#frg_billstatus_ObjectSubject').text();

          // Handle categories
          $('#frg_billstatus_CategoryList ').each(function() {
            let cat = $(this.text());
            model.addCategory(cat);
          });

          // Handle versions and histroy
         
          $('#frg_billstatus_HistoriesGridView tr').each(function(i) {
            console.log(i);
            // Skip unlabeled header
            if (i === 0) {
               return true;
             }

            // Add to history
            let date = $(this).find('td').siblings(':first').text();
            let action = $(this).find('td').siblings(':last').text();
            model.addHistory(action.text(), date);

            // versions
            let asset = false,
                text = false;

            if (action.indexOf('INTRODUCED BY') === 0) {
              asset = $('frg_billstatus_ImageIntroPdf').find('a[href$="PDF"]').attr('href');
              text = "Introduced"
            } else {
              let sub = $(action).find('a[href$="pdf"]');
              asset = $(sub).attr('href');
              text = $(sub).text();
            }

            model.addVersion(action, asset, text, date);
            
            // Set status
            if (sf.hasOwnProperty(action)) {
              model.setStatus(action);
            }

          });

          resolve(JSON.stringify(model));
        })
        .catch(err => {
          reject(err);
        });
    });

  }
};
