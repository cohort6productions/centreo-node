const axios = require('axios');

const { crm } = require('../config');

const {
  CASE_URL,
  PARTY_URL,
  ATTACHMENT_URL,
  ENTRY_URL,
  headerConfig,
  TASK_URL
} = crm;

class RegistrationService {
  static getCase(id) {
    return axios.get(`${CASE_URL}`, headerConfig);
  }
  
  static createContent (content, invoiceNumber) {
    var contentText='';

    const filesArray = ['identity', 'address_proof', 'article_of_associate', 'business_license']

     Object.keys(content).map((value, key) => {
      contentText +=`${value}\n`
      contentText +=`-----\n`

      if (value === 'shareholders' || value == 'director') {
        content[value].map((share) => {
          Object.keys(share).map((v, i) => {
            if (!filesArray.includes(v) && !!share[v]) {
              contentText += `${v}: ${share[v]} \n`
            }
          })
          contentText += '\n \n'
        })
      } else if(value === 'comments') {
        contentText += content[value]
        contentText += '\n \n'
      } else if(value === 'terms') {
        contentText += content[value] ? 'Agreed to the terms & conditions' : 'No'
        contentText += '\n \n'
      } else {
        Object.keys(content[value]).map((v,i) => {
          
          if (!!content[value][v]) {
            contentText += `${v}: ${content[value][v]} \n`
          }
          
        })
        contentText += '\n \n'

      }
    })

    if (!!invoiceNumber) {
      contentText += `INVOICE NO. \n ${invoiceNumber}`
    }

    return contentText;
  }

  static async createRegistration({
    input
  }) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth() >= 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`}-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`;

    const data = {
      party: {
        type: 'person',
        firstName: input.personal.firstname,
        lastName: input.personal.lastname,
        emailAddresses: [
          {
            address: input.personal.email,
          },
        ],
        addresses: [
        ],
        phoneNumbers: [
          {
            number: input.personal.phone,
          },
        ],
        websites: []
      },
    };
    try {
      const res = await axios.post(PARTY_URL, data, headerConfig);
      return res;
    }catch (e) {
      console.log(e)
    }
  } 

  static createAttachment(file) {
    const {filename} = file;

    return axios.post(ATTACHMENT_URL, file.data, {
      headers: {
        Authorization: headerConfig.headers.Authorization,
        'Content-Type': file.contentType,
        'X-Attachment-Filename': filename,
        'Content-Length': file.contentLength
      },
    });
  }

  static createEntry({
    partyId,
    content,
    attachments
  }) {
    const data = {
      entry: {
        attachments,
        party: {
          id: partyId,
        },
        type: 'note',
        content: content,
      },
    };
    console.log(data)
    return axios.post(ENTRY_URL, data, headerConfig);
  }

  static createTask({
    partyId,
    dueDate,
    dueTime,
    desc
  }) {
    const data = {
      task: {
        description: desc,
        party: {
          id: partyId,
        },
        category: {
          name: "follow-up"
        },
        dueOn: dueDate,
        dueTime: dueTime
      },
    };
    return axios.post(TASK_URL, data, headerConfig);
  }
}

module.exports = RegistrationService;
