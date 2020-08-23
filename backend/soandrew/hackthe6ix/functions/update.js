const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* @returns {object}
*/
module.exports = async () => {
  const { data } = await lib.http.request['@1.1.5'].get({
    url: `https://api.twitter.com/1.1/search/tweets.json`,
    authorization: `Bearer ${process.env.TWITTER_SECRET_TOKEN}`,
    queryParams: {
      q: 'from:PayBlkTrnsWomen filter:retweets url:gofundme',
      result_type: 'recent',
      count: 100,
      tweet_mode: 'extended',
    },
  });
  if (data.errors) {
    console.error(data);
    return {};
  }
  const records = data.statuses
    //.filter(({ retweeted_status }) => (
    //  retweeted_status
    //  && retweeted_status.entities.urls.length
    //  && retweeted_status.entities.urls[0].expanded_url.includes('gofundme')
    //))
    .map(({
      retweeted_status: {
        full_text,
        entities: {
          urls: [{
            expanded_url: url,
          }],
        },
        user,
      }
    }) => ({
      'User Profile': `https://twitter.com/${user.screen_name}`,
      'User Display Name': user.name,
      'User Profile Picture': user.profile_image_url_https.replace('_normal', ''),
      'GoFundMe': `${new URL(url).origin}${new URL(url).pathname}`,
      'Notes': full_text,
      'Labels': ['black', 'trans', 'woman'],
    }));
    for (const record of records) {
      const { rows: [recordInDb] } = await lib.airtable.query['@0.5.3'].select({
        baseId: `appf2spdTvxN1gmmp`,
        table: `PayBlkTrnsWomen`,
        where: [
          {
            'User Profile__is': `${record['User Profile']}`
          }
        ],
        limit: {
          'count': 1,
          'offset': 0
        }
      })
      if (recordInDb) {
        await lib.airtable.query['@0.5.3'].records.update({
          baseId: `appf2spdTvxN1gmmp`,
          table: `PayBlkTrnsWomen`,
          id: `${recordInDb.id}`,
          fields: record,
        });
      } else {
        await lib.airtable.query['@0.5.3'].insert({
          baseId: `appf2spdTvxN1gmmp`,
          table: `PayBlkTrnsWomen`,
          fieldsets: [record],
          typecast: false
        });
      }
    }
    return {};
};
