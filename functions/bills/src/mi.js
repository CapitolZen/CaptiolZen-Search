const cheerio = require('cheerio'),
      async = require('async'),
      moment = require('moment'),
      _ = require('lodash'),
      rp = require('request-promise-native'),
      utils = require('../utils'),
      url = require('url'),
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
  billDetail: '/doc.aspx?',
  baseUrl: 'http://www.legislature.mi.gov',
  currentSession: '2017',

  getBillDetailUrl(id) {
    //let clean = id.replace(' ', '-');
    return `${this.baseUrl}${this.billDetail}${this.currentSession}-${id}`;
  },

  mungeAssetUrl(u) {
    let base = this.baseUrl;
    return url.resolve(base, u);
  },

  /**
   * Return if bill exists
   * @param id
   * @returns {Promise}
   */
  nextBillExists(id) {
    let num = id.split('-');
    let newId = parseInt(num[1]);
    newId++;

    // Senate Bills start with leading 0's. This fixes that error
    if (num[1].indexOf('0') == '0') {
      newId = ("0000" + newId).slice(-4);
    }

    let newStateId = `${num[0]}-${newId}`;

    let newUrl = this.getBillDetailUrl(newStateId);
    return new Promise((resolve) => {
      let output = {id: newStateId};
      rp(newUrl)
        .then(html => {
          let $ = cheerio.load(html);
          let title = $('title').text();
          if (title.includes('Not Found')) {
            output.exists = false;
            resolve(output);
          } else {
            output.exists = true;
            resolve(output);
          }
        })
        .catch(() => {
          output.exists = false;
          resolve(true)
        })
    });
  },

  /**
   * Making the magic happen
   * @param  {string} id bill id
   * @return {Promise}    A promise that resolves an object containing bill data
   */
  parseBillSummary(id) {
    return new Promise((resolve, reject) => {
      const self = this;
      let url = this.getBillDetailUrl(id);
      let sf = this.statusfizer;
      rp(url)
        .then(html => {
          // Setup Basic data
          model.state = 'MI';
          model.state_id = id;

          // Start the parsing party
          let $ = cheerio.load(html);
          // Need to make sure bill exists
          let title = $('title').text();
          if (title.includes('Not Found')) {
            reject({error: "Bill doesn't exist"})
          }


            model.title = $('#frg_billstatus_BillHeading').text()
          // Handle sponsors
          $('#frg_billstatus_SponsorList > a').each(function(i) {
            let name = $(this).text();

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
            let cat = $(this).text();
            model.addCategory(cat);
          });

          // Handle versions and histroy
          
          $('#frg_billstatus_HistoriesGridView tr').each(function(i) {
            // Skip unlabeled header
            if (i === 0) {
               return true;
             }

            // Add to history
            let date = $(this).find('td').first().text().trim();
            let action = $(this).find('td').last().text().trim().toLowerCase();
            let $action = $(this).find('td').last();
            model.addHistory(action, date);

            // versions
            let asset = false,
                text = false;

            if (action.indexOf('referred to committee') === 0) {
              model.current_committee = $($action).find('a').text();
            }

            if (action.indexOf('introduced by') === 0) {
              asset = $('#frg_billstatus_ImageIntroPdf').find('a[href$="pdf"]').attr('href');
              text = "Introduced";
              model.addVersion(action, asset, text, date);
            } else {
              let sub = $(this).find('td').last().find('a');
              if (sub.length) {
                  asset = $(sub).attr('href');
                if (asset.endsWith('.pdf') || asset.endsWith('.PDF')) {
                  asset = self.mungeAssetUrl(asset);
                  text = $(this).find('td').last().text();
                  model.addVersion(action, asset, text, date);
                }
              }
            }

            // munge and set status
            let statusKeys = _.keys(sf);
            let status = statusKeys.find(key => { return action.indexOf(key) === 0 }) || false;
            if (status) {
              model.status = sf[status];
            }
          });
          resolve(model.export());
        })
        .catch(err => {
          reject({error: err});
        });
    });

  }
};
