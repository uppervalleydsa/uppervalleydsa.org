/* eslint-disable import/prefer-default-export */

import { loadStripe } from '@stripe/stripe-js';

let stripeInstance;

export const memoizedClient = async () => {
  if (stripeInstance) return Promise.resolve(stripeInstance);
  stripeInstance = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
  return stripeInstance;
};

export const redirectToCheckout = async (event, price, options, setLoading) => {
  event.preventDefault();
  setLoading(true);
  const stripe = await memoizedClient();
  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems: [{ price, quantity: 1 }],
    ...options,
  });

  if (error) {
    console.error('Error:', error);
    setLoading(false);
  }
};
