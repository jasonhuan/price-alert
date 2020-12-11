// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const rp = require('request-promise');

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    'slug': 'ethereum'
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
  },
  json: true,
  gzip: true
};


rp(requestOptions).then(response => {
  //console.log('API call response:', response);
  //console.log('API call response [Ethereum price]:', (response['data']['1027']['quote']['USD']['price']).toFixed(2));
  client.messages
	.create({
    	body: 'Ethereum price: ' + (response['data']['1027']['quote']['USD']['price']).toFixed(2),
    	from: '+12058391768',
    	to: '+16518088534'
	})
	//.then(message => console.log(message.sid));
}).catch((err) => {
  console.log('API call error:', err.message);
});