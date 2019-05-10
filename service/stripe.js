const {stripe} = require('../config')
const StripeLoader = require('stripe');
const stripeInstance = new StripeLoader(stripe.SECRET_API_KEY)

class StripeService {
    static charge(token, amount, billing_email) {
        return stripeInstance.charges.create({
            amount: amount * 100,
            currency: 'hkd',
            source: token,
            description: 'Company Incorporation',
            receipt_email: billing_email,
        })
    }
}

module.exports = StripeService;