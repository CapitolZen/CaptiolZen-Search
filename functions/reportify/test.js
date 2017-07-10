const main = require('./main');

const event = {
  organization: 'test-admin',
  group: 'fakeuuid-group',
  bucket: 'capitolzen-user-files',
  data: {
    title: 'My fancyass report',
    summary: 'Collaboratively syndicate virtual synergy for out-of-the-box technologies. Quickly empower high standards in portals via market-driven methodologies. Distinctively aggregate enabled quality vectors rather than intermandated models. Quickly actualize multimedia based bandwidth without synergistic interfaces.',
    bills: [
      {
        id: 'tasdfasdfasdf',
        attributes: {
          state: 'MI',
          'current-committee': 'Local Government',
          sponsor: 'Michael McCready',
          'state-id': 'HB-4100',
          status: 'referral-committee',
          summary: 'Local government; water and sewer; municipal stormwater utilities; provide for, and authorize fee. Creates new act.',
          'remote-url': 'http://google.com'
        }
      },
      {
        id: 'asdfasdfasd',
        attributes: {
          'current-committee': "",
          sponsor: "Mary Whiteford",
          state: "MI",
          'state-id': "HB-4540",
          status: "executive-receipt",
          summary: "Environmental protection; funding; sunsets on fees for wastewater and drinking water certifications and waste program facility and user charges; extend. Amends secs. 3110, 4104, 11135, 11153, 12109 & 12112 of 1994 PA 451 (MCL 324.3110 et seq.).",
          title: "House Bill 4540 (2017)"
        }
      }
    ]
  }
};

main(event)
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });