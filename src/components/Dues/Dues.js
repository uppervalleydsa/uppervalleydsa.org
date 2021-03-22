import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import classNames from 'classnames';

import Spinner from '../Spinner';
import { memoizedClient } from '../../utils/stripe';
import {
  dues,
  checkoutBtn,
  checkoutLoading,
  freeDuesBtn,
  spinner,
} from './dues.module.css';

const query = graphql`
  query getSiteMeta {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

const Dues = ({ prices }) => {
  const [freeDues, ...paidDues] = prices;
  const [loading, setLoading] = useState(false);
  const data = useStaticQuery(query);
  const { siteUrl } = data.site.siteMetadata;

  const redirectToCheckout = async (event, price) => {
    event.preventDefault();
    setLoading(true);
    const stripe = await memoizedClient();
    const { error } = await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price, quantity: 1 }],
      successUrl: `${siteUrl}/members/dues-success`,
      cancelUrl: `${siteUrl}/members/dues-error`,
    });

    if (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div
      className={classNames(dues, {
        [checkoutLoading]: loading,
      })}
    >
      {loading && <Spinner className={spinner} />}
      <ul>
        {paidDues.map(({ node }) => (
          <li key={node.id}>
            <button
              role="link"
              type="button"
              disabled={loading}
              className={checkoutBtn}
              onClick={(e) => redirectToCheckout(e, node.id)}
            >
              ${node.unit_amount / 100}
            </button>
          </li>
        ))}
      </ul>
      <button
        role="link"
        type="button"
        className={freeDuesBtn}
        onClick={(e) => redirectToCheckout(e, freeDues.node.id)}
      >
        Formal membership with waived fees is also available.
      </button>
    </div>
  );
};

export default Dues;
