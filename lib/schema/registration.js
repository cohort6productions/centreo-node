const email = {
  "type": "object",
  "properties": {
    "type": {
      "enum": ["Home", "Work"]
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
      "enum": ["Home", "Postal", "Office"]
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
      "enum": ["Home", "Work", "Mobile", "Fax", "Direct"]
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
      "enum": ["URL", "SKYPE", "TWITTER", "LINKED_IN", "FACEBOOK", "XING", "FEED", "GOOGLE_PLUS", "FLICKR", "GITHUB", "YOUTUBE", "INSTAGRAM", "PINTEREST"]
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
        },
        "phoneNumbers": {
          "type": "array",
          "items": phone
        },
        "websites": {
          "type": "array",
          "items": web
        },
      }
    }
  }
}
