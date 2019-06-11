require('dotenv').config();

const config = {
  stripe: {
    SECRET_API_KEY: process.env.STRIPE_SECRET_API_KEY
  },
  crm: {
    PARTY_URL: 'https://api.capsulecrm.com/api/v2/parties',
    ATTACHMENT_URL: 'https://api.capsulecrm.com/api/v2/attachments/upload',
    ENTRY_URL: 'https://api.capsulecrm.com/api/v2/entries',
    CASE_URL: 'https://api.capsulecrm.com/api/v2/kases',
    TASK_URL: 'https://api.capsulecrm.com/api/v2/tasks',
    headerConfig: {
      headers: {
        Authorization: `Bearer ${process.env.CAPSULE_AUTH_TOKEN}`,
      },
    },
  },
  invoice: {
    appCredentials: {
      appType: 'private',
      consumerKey: process.env.XERO_CONSUMER_KEY,
      consumerSecret: process.env.XERO_CONSUMER_SECRET,
      privateKeyPath: './config/private.pem'
    },
  },
  development: 'windows',
  logger: {
    name: 'centreo-node',
    level: 'trace',
    streams: [
      {
        stream: process.stderr,
      },
    ],
  },
};

module.exports = config;
