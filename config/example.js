require('dotenv').config();

const config = {
  crm: {
    BASE_URL: '',
    headerConfig: {
      headers: {
        Authorization: `Bearer ${process.env.CAPSULE_AUTH_TOKEN}`,
      },
    },
  },
  invoice: {
    appCredentials: {
      appType: '',
      consumerKey: '',
      consumerSecret: '',
      privateKeyPath: '',
    },
  },
  development: 'windows',
};

module.exports = config;
