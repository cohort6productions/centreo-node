require('dotenv').config();

const config = {
  crm: {
    BASE_URL: '',
    headerConfig: {
      headers: {
        Authorization: `Bearer ${process.env.CAPSULE_AUTH_TOKEN}`,
      },
    }
  },
  invoice: {
    "appType" : "",
    "consumerKey": "",
    "consumerSecret": "",
    "privateKeyPath": "/some/path/to/privatekey.pem"
  }
}

module.exports = config;