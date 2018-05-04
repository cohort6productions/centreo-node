const config = require('./config')

module.exports = {
    extends: "airbnb-base",
    rules: {
        "linebreak-style": ["error", config.development],
        "arrow-parens": ["error", "as-needed"]
    }
}