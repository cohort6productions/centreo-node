const email = {
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "address": {
      "type": "string"
    },
  }
};

const address = {
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "street": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "zip": {
      "type": "string"
    },
  }
};

const phone = {
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "number": {
      "type": "string"
    },
  }
};

const web = {
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "service": {
      "type": "string"
    },
    "address": {
      "type": "string"
    },
  }
}

module.exports = {
  "type": "object",
  "properties": {
    "party": {
      "type": "object",
      "properties": {
        "type": {
          "enum": ["organisation"]
        },
        "name": {
          "type": "string"
        },
        "about": {
          "type": "string"
        },
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