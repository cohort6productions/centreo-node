const email = {
  "type": "object",
  "properties": {
    "type": "string",
    "address": "string"
  }
};

const address = {
  "type": "object",
  "properties": {
    "type": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zip": "string"
  }
};

const phone = {
  "type": "object",
  "properties": {
    "type": "string",
    "number": "string"
  }
};

const web = {
  "type": "object",
  "properties": {
    "type": "string",
    "service": "string",
    "address": "string"
  }
}

module.exports = {
  "type": "object",
  "properties": {
    "party": {
      "type": "object",
      "properties": {
        "type": "string",
        "name": "string",
        "about": "string",
        "emailAddresses": {
          "type": "array",
          "items": email
        },
        "addresses": {
          "type": "array",
          "items": address
        }
      }
    }
  }
}

// module.exports = {
//   "properties": {
//     "party": {
//       "type": "object",
//       "properties": {
//         "type": "string",
//         "name": "string",
//         "about": "string",
//         "emailAddresses": {
//           "type": "array",
//           "items": email
//         },
//         "addresses": {
//           "type": "array",
//           "items": address
//         },
//         "phoneNumbers": {
//           "type": "array",
//           "items": phone
//         },
//         "websites": {
//           "type": "array",
//           "items": web
//         }
//       }
//     }
//   }
// }