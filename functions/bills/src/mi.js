const cheerio = require('cheerio'),
      async = require('async'),
      rp = require('request-promise-native');

module.exports = {
  categorizer: {
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
    let clean = id.replace(' ', '-');
    return `${this.baseUrl}${this.billDetail}${this.currentSession}-${clean}`;
  },

  fetchAllBills() {},
  parseBill(id) {
    let url = this.getBillDetailUrl(id);
    rp(url)
      .then(html => {
        $ = cheerio.load(html);

        
      })
  }
};
