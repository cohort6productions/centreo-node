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
    main,
    invoiceNo,
  }) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth() >= 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`}-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`;
    
    const data = {
      party: {
        ...main,
        fields: [
          {
            definition: {
              id: 291070 // IH/VO/CW/CR
            },
            value: invoiceNo
          },
          {
            definition: {
              id: 291071 // Company Incorporation Date
            },
            value: todayString
          },
          {
            definition: {
              id: 291072 // Company Secretary Date
            },
            value: todayString
          },
          {
            definition: {
              id: 291075 // WC Registered Office
            },
            value: todayString
          },
          {
            definition: {
              id: 291077 // SW RO
            },
            value: todayString
          }
        ]
      },
    };

    return axios.post(PARTY_URL, data, headerConfig);
  }

  static createAttachment({
    file,
    readFile,
  }) {
    console.log(file.mimeType)
    return axios.post(ATTACHMENT_URL, readFile.data, {
      headers: {
        Authorization: headerConfig.headers.Authorization,
        "Content-Type": file.mimeType,
        "Content-Length": readFile.length,
        "X-Attachment-Filename": file.filename
      },
    });
  }

  static createEntry({
    partyId,
    attachmentId
  }) {
    const data = {
      entry : {
        attachments : [ {
          token : attachmentId
        } ],
        party : {
          id : partyId
        },
        type : "note",
        content : "SRPOUT package passport and address proof"
      }
    }
    return axios.post(ENTRY_URL, data, headerConfig)
  }
}

module.exports = RegistrationService;
