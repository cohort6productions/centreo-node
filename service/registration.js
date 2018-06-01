const axios = require('axios');

const { crm } = require('../config');

const {
  PARTY_URL,
  ATTACHMENT_URL,
  ENTRY_URL,
  headerConfig,
} = crm;

class RegistrationService {
  static createRegistration({
    input,
    invoiceNo,
  }) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth() >= 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`}-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`;

    const data = {
      party: {
        type: 'organisation',
        name: input.name,
        about: input.about,
        emailAddresses: [
          {
            address: input.email,
          },
        ],
        addresses: [
          {
            city: input.city,
            country: input.country,
            street: input.street,
            zip: input.zip,
          },
        ],
        phoneNumbers: [
          {
            number: input.phone,
          },
        ],
        websites: [],
        fields: [
          {
            definition: {
              id: 291070, // IH/VO/CW/CR
            },
            value: invoiceNo,
          },
          {
            definition: {
              id: 291071, // Company Incorporation Date
            },
            value: todayString,
          },
          {
            definition: {
              id: 291072, // Company Secretary Date
            },
            value: todayString,
          },
          {
            definition: {
              id: 291075, // WC Registered Office
            },
            value: todayString,
          },
          {
            definition: {
              id: 291077, // SW RO
            },
            value: todayString,
          },
        ],
      },
    };

    return axios.post(PARTY_URL, data, headerConfig);
  }

  static createAttachment(file) {
    const { url } = file.config;
    const filename = url.substring(url.lastIndexOf('/') + 1);
    return axios.post(ATTACHMENT_URL, file.data, {
      headers: {
        Authorization: headerConfig.headers.Authorization,
        'Content-Type': file.headers['content-type'],
        'Content-Length': file.headers['content-length'],
        'X-Attachment-Filename': filename,
      },
    });
  }

  static createEntry({
    partyId,
    attachments,
  }) {
    const data = {
      entry: {
        attachments,
        party: {
          id: partyId,
        },
        type: 'note',
        content: 'SRPOUT package passport and address proof',
      },
    };
    return axios.post(ENTRY_URL, data, headerConfig);
  }
}

module.exports = RegistrationService;
