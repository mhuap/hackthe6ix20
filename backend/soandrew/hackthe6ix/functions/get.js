const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* @returns {array}
*/
module.exports = async () => {
  const { rows: iHartErickaRecords } = await lib.airtable.query['@0.5.3'].select({
    baseId: `appf2spdTvxN1gmmp`,
    table: `iHartEricka`,
    where: [{}],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  const { rows: payBlkTrnsWomenRecords } = await lib.airtable.query['@0.5.3'].select({
    baseId: `appf2spdTvxN1gmmp`,
    table: `PayBlkTrnsWomen`,
    where: [{}],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  return [...iHartErickaRecords, ...payBlkTrnsWomenRecords];
};
