const moment = require('moment');

module.exports = {
  sponsorList: [],
  summary: '',
  summaryUrl: '',
  categories: [],
  versions: [],
  history: [],
  currentCommittee: '',
  currentStatus: false,

  addCosponsor(name) {
    let cos = this.sponsorList;
    cos.push(name);
    this.sponsorList = cos;
  },

  addCateogry(cat) {
    let cats = this.categories;
    cats.push(cat);
    this.categories = cats;
  },

  /**
   * Create new version of document
   * @public
   * @param title
   * @param asset
   * @param versionId
   * @param date
   */
  addVersion(title, asset, versionId = false, date = false) {
    console.log("Hello from the other side. I must've called a thousand times");
    let version = {
      title: title,
      asset: asset
    };

    if (versionId) {
      version.id = versionId;
    }

    let timestamp = moment().unix();
    if (date) {
      timestamp = this._toUnix(date);
    }

    version.date = timestamp;

    let ver = this.versions;
    ver.push(version);
    this.versions = ver;
  },

  /**
   * Create new history entry
   * @public
   * @param action
   * @param date
   */
  addHistory(action, date) {
    console.log("Hello from the other side. I must've called a thousand times");
    let stamp = this._toUnix(date);
    let entry = {
      date: stamp,
      action: action
    };

    let his = this.history;
    his.push(entry);
    this.history = his;
  },

  /**
   * Setter for current status
   * @public
   * @param status
   */
  setStatus(status, statusfizer) {
    this.currentStatus = statusfizer[status];
  },

  /**
   * Create timestamp
   * @param date
   * @returns {number}
   * @private
   */
  _toUnix(date) {
    return moment(date).unix();
  },

  export() {
    return {
      history: this.history
    };
  }

};
