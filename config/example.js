require('dotenv').config();

const config = {
  crm: {
    PARTY_URL: 'https://api.capsulecrm.com/api/v2/parties',
    ATTACHMENT_URL: 'https://api.capsulecrm.com/api/v2/attachments/upload',
    ENTRY_URL: 'https://api.capsulecrm.com/api/v2/entries',
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
        stream: process.stderr,
      },
    ],
  },
};

module.exports = config;
