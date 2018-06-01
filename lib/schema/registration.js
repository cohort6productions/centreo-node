module.exports = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "about": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "street": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "zip": {
      "type": "string"
    },
    "file1url": {
      "type": "string"
    },
    "file2url": {
      "type": "string"
    }
  }
}

// const email = {
//   "type": "object",
//   "properties": {
//     "type": {
//       "enum": ["Home", "Work"]
//     },
//     "address": {
//       "type": "string"
//     },
//   }
// };

// const address = {
//   "type": "object",
//   "properties": {
//     "type": {
//       "enum": ["Home", "Postal", "Office"]
//     },
//     "street": {
//       "type": "string"
//     },
//     "city": {
//       "type": "string"
//     },
//     "state": {
//       "type": "string"
//     },
//     "country": {
//       "type": "string"
//     },
//     "zip": {
//       "type": "string"
//     },
//   }
// };

// const phone = {
//   "type": "object",
//   "properties": {
//     "type": {
//       "enum": ["Home", "Work", "Mobile", "Fax", "Direct"]
//     },
//     "number": {
//       "type": "string"
//     },
//   }
// };

// const web = {
//   "type": "object",
//   "properties": {
//     "type": {
//       "enum": ["URL", "SKYPE", "TWITTER", "LINKED_IN", "FACEBOOK", "XING", "FEED", "GOOGLE_PLUS", "FLICKR", "GITHUB", "YOUTUBE", "INSTAGRAM", "PINTEREST"]
//     },
//     "service": {
//       "type": "string"
//     },
//     "address": {
//       "type": "string"
//     },
//   }
// }

// const field = {
//   "type": "object",
//   "properties": {
//     "definition": {
//       "type": "object",
//       "properties": {
//         "id": {
//           "type": "integer"
//         }
//       }
//     },
//     "value": {
//       "type": "string"
//     }
//   }
// }

// module.exports = {
//   "type": "object",
//   "properties": {
//     "party": {
//       "type": "object",
//       "properties": {
//         "type": {
//           "enum": ["organisation"]
//         },
//         "name": {
//           "type": "string"
//         },
//         "about": {
//           "type": "string"
//         },
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
//         },
//         "fields": {
//           "type": "array",
//           "items": field
//         }
//       }
//     }
//   }
// }
