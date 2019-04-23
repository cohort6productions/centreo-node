const {stripe} = require('../config')
const StripeLoader = require('stripe');
const stripeInstance = new StripeLoader(stripe.SECRET_API_KEY)

class StripeService {
    static charge(token, amount) {
        return stripeInstance.charges.create({
            amount: amount * 100,
            currency: 'hkd',
            source: token,
            description: 'Company Incorporation'
        })
    }
}

module.exports = StripeService;