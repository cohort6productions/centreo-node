require('dotenv').config();

const config = {
  stripe: {
    SECRET_API_KEY: ''
  },
  crm: {
    PARTY_URL: 'https://api.capsulecrm.com/api/v2/parties',
    ATTACHMENT_URL: 'https://api.capsulecrm.com/api/v2/attachments/upload',
    ENTRY_URL: 'https://api.capsulecrm.com/api/v2/entries',
    TASK_URL: 'https://api.capsulecrm.com/api/v2/tasks',
    headerConfig: {
      headers: {
        Authorization: `Bearer `,
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
