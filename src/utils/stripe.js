/* eslint-disable import/prefer-default-export */

import { loadStripe } from '@stripe/stripe-js';

let stripeInstance;

export const memoizedClient = async () => {
  if (stripeInstance) return Promise.resolve(stripeInstance);
  stripeInstance = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
  return stripeInstance;
};
