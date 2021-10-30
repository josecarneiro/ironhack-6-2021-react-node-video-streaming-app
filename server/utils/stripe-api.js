const stripe = require('stripe');

const stripeApi = stripe(process.env.STRIPE_SECRET_API_KEY);

module.exports = stripeApi;
