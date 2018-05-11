const config = require('./config')

module.exports = {
    extends: "airbnb-base",
    rules: {
        // "linebreak-style": ["error", config.development],
        "linebreak-style": "off",
        "arrow-parens": ["error", "as-needed"]
    }
}