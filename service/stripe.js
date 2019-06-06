const {stripe} = require('../config')
const StripeLoader = require('stripe');
const stripeInstance = new StripeLoader(stripe.SECRET_API_KEY)

class StripeService {
    static charge({amount, customer}) {
        return stripeInstance.charges.create({
            amount: amount * 100,
            currency: 'hkd',
            customer: customer.id,
            description: 'Company Incorporation',
            receipt_email: customer.email,
        })
    }
    static createCustomer({token, billing_email}) {
        return stripeInstance.customers.create({
                email: billing_email,
                description: 'Customer',
                source: token
            });
    }
}

module.exports = StripeService;