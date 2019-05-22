require('dotenv').config();

const config = {
  stripe: {
    SECRET_API_KEY: process.env.SECRET_API_KEY
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
      appType: 'public',
      consumerKey: '',
      consumerSecret: '',
      privateKeyPath: '',
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
