import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Mailto from '../components/Mailto';
import Spinner from '../components/Spinner';
import SEO from '../components/seo';
import { redirectToCheckout } from '../utils/stripe';
import {
  donationContainer,
  donateBtn,
  spinBtn,
  spinBtnContainer,
  amountControl,
} from '../styles/donate.module.css';

const Donate = ({ location, data }) => {
  const { hash } = location;
  const [loading, setLoading] = useState(false);

  const [decrementEnabled, setDecrementEnabled] = useState(true);
  const [incrementEnabled, setIncrementEnabled] = useState(true);

  const donations = data.prices.edges;
  const donationMin = donations[0].node.unit_amount;
  const donationMax = donations[donations.length - 1].node.unit_amount;

  const [selectedAmount, selectAmount] = useState(donations[2].node);
  const [selectedAmountFormatted, selectAmountFormatted] = useState(
    `$${selectedAmount.unit_amount / 100}.00`,
  );

  const updateAmount = (event) => {
    let increment = 0;

    switch (event.key) {
      case '-':
      case 'j':
      case 'ArrowDown':
      case 'PageDown':
        increment = -1;
        break;
      case '+':
      case 'k':
      case 'ArrowUp':
      case 'PageUp':
        increment = 1;
        break;
      default:
        return;
    }

    const currentIndex = donations.findIndex(
      (d) => d.node.id === selectedAmount.id,
    );

    const desiredIndex = currentIndex + increment;
    if (desiredIndex < 0 || desiredIndex > donations.length - 1) {
      return;
    }

    if (desiredIndex === 0) {
      setDecrementEnabled(false);
    } else if (desiredIndex === donations.length - 1) {
      setIncrementEnabled(false);
    } else {
      setDecrementEnabled(true);
      setIncrementEnabled(true);
    }

    selectAmount(donations[desiredIndex].node);
    selectAmountFormatted(
      `$${donations[desiredIndex].node.unit_amount / 100}.00`,
    );
  };

  const { siteUrl } = data.site.siteMetadata;
  const options = {
    submitType: 'donate',
    successUrl: `${siteUrl}/donate#success`,
    cancelUrl: `${siteUrl}/donate#error`,
  };

  if (!hash) {
    return (
      <Layout>
        <SEO
          title="Donate"
          description="Make a donation to support socialist organizing in the Upper Valley."
        />
        <h2>Donate</h2>
        <p>Your support will fund TODO TODO need copy</p>
        <p>Please note that donations are not tax-deductible.</p>
        <div className={donationContainer}>
          <div className={spinBtnContainer}>
            <div
              className={spinBtn}
              role="spinbutton"
              aria-valuemin={donationMin}
              aria-valuemax={donationMax}
              aria-valuenow={selectedAmount.unit_amount / 100}
              aria-valuetext={selectedAmountFormatted}
              aria-label="Donation amount in USD"
              tabIndex="0"
              onKeyDown={updateAmount}
            >
              {selectedAmountFormatted}
              <button
                type="button"
                tabIndex="-1"
                aria-label="Decrease donation amount"
                className={amountControl}
                disabled={!decrementEnabled}
                onClick={() => updateAmount({ key: '-' })}
              >
                -
              </button>
              <button
                type="button"
                tabIndex="-1"
                aria-label="Increase donation amount"
                className={amountControl}
                disabled={!incrementEnabled}
                onClick={() => updateAmount({ key: '+' })}
              >
                +
              </button>
            </div>
          </div>
          <button
            role="link"
            type="button"
            disabled={loading}
            className={donateBtn}
            onClick={(e) =>
              redirectToCheckout(e, selectedAmount.id, options, setLoading)
            }
          >
            {loading ? <Spinner color="white" /> : 'Donate'}
          </button>
        </div>
      </Layout>
    );
  } else if (hash === '#success') {
    return (
      <Layout>
        <SEO title="Donation" />
        <h2>Thank you</h2>
        <p>Your donation is complete. Thank you for your support!</p>
        <p>A receipt will be sent to your email.</p>
      </Layout>
    );
  } else if (hash === '#error') {
    return (
      <Layout>
        <SEO title="Donation" />
        <h2>Donation Incomplete</h2>
        <p>Your donation was not completed because an issue occurred.</p>
        <p>
          <span>Please try again, or email </span>
          <Mailto address="contact@uppervalleydsa.org" />
          <span> if issues continue.</span>
        </p>
      </Layout>
    );
  } else {
    throw new Error(`Didn't expect to recieve hash: ${hash}`);
  }
};

export const query = graphql`
  query getDonationProductAndSiteMeta {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prices: allStripePrice(
      filter: {
        active: { eq: true }
        product: { name: { regex: "/Donation/" } }
      }
      sort: { fields: unit_amount, order: ASC }
    ) {
      edges {
        node {
          id
          unit_amount
        }
      }
    }
  }
`;

export default Donate;
