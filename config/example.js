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
  logger: {
    name: '',
    level: 'trace',
    streams: [
      {
        path: './logs/server.log',
      },
    ],
  },
};

module.exports = config;
