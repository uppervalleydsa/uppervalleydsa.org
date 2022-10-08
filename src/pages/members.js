import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SEO from '../components/seo';
import Mailto from '../components/Mailto';
import { redirectToCheckout } from '../utils/stripe';
import {
  dues,
  checkoutBtn,
  checkoutLoadingState,
  freeDuesBtn,
  spinner,
  manageBtn,
} from '../styles/members.module.css';

export const query = graphql`
  query getDuesProductAndSiteMeta {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prices: allStripePrice(
      filter: { active: { eq: true }, product: { name: { regex: "/Dues/" } } }
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

const Members = ({ location, data }) => {
  const { hash } = location;
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [freeDues, ...paidDues] = data.prices.edges;

  const { siteUrl } = data.site.siteMetadata;
  const options = {
    mode: 'subscription',
    successUrl: `${siteUrl}/members#dues-success`,
    cancelUrl: `${siteUrl}/members#dues-error`,
  };

  if (!hash) {
    return (
      <Layout>
        <SEO title="Members" />
        <h2>Members</h2>
        <p>Useful links and information for members.</p>

        <h3>FAQ</h3>
        <p>
          Check out <Link to="/faq">the FAQ</Link> for lots of info on meetings,
          working groups and more.
        </p>

        <h3>Dues</h3>
        <p>
          <span>
            Optional monthly dues help sustain the chapter&#39;s Upper Valley
          </span>
          <span> </span>
          <Link to="/organizing">organizing priorities</Link>
          <span> and fund local mutual aid projects. </span>
          <span>
            These dues are separate from any membership dues you may pay to
            National DSA. Click below to set up dues payment with a credit or
            debit card. Questions about dues (including cancellation) can be
            directed to
          </span>
          <span> </span>
          <Mailto address="dues@uppervalleydsa.org" />.
        </p>
        <p>
          You can enroll in dues at any of the following tiers, paid monthly:
        </p>
        <div
          className={classNames(dues, {
            [checkoutLoadingState]: checkoutLoading,
          })}
        >
          {checkoutLoading && <Spinner className={spinner} />}
          <ul>
            {paidDues.map(({ node }) => (
              <li key={node.id}>
                <button
                  role="link"
                  type="button"
                  disabled={checkoutLoading}
                  className={checkoutBtn}
                  onClick={(e) =>
                    redirectToCheckout(e, node.id, options, setCheckoutLoading)
                  }
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
            onClick={(e) =>
              redirectToCheckout(
                e,
                freeDues.node.id,
                options,
                setCheckoutLoading,
              )
            }
          >
            Formal membership with waived fees is also available.
          </button>
        </div>

        <br />
        <h3>Manage Dues</h3>
        <p>
          Dues-paying members can manage their dues subscription by entering
          clicking the button below. The external site (stripe.com, our payment
          processor) will ask you to enter your email address for verification.
          After verification, you&#39;ll be able to update credit card
          information, change dues level, or cancel a dues subscription.
        </p>
        <Link
          className={manageBtn}
          to="https://billing.stripe.com/p/login/3cs5nQexGa5xguc4gg"
        >
          Manage dues
        </Link>
      </Layout>
    );
  } else if (hash === '#dues-success') {
    return (
      <Layout>
        <h2>Dues enrollment complete</h2>
        <p>
          You have sucessfully been enrolled in monthly chapter dues. If you
          made a payment, a receipt will be send to your email on file.
        </p>
        <p>
          For any questions about your dues membership, please email
          <span> </span>
          <Mailto address="dues@uppervalleydsa.org" />.
        </p>
      </Layout>
    );
  } else if (hash === '#dues-error') {
    return (
      <Layout>
        <h2>Dues enrollment error</h2>
        <p>
          <span>Your dues enrollment could not be completed. </span>
          <Link to="/members">Please try again.</Link>
        </p>
        <p>
          <span>If issues continue, please email </span>
          <Mailto address="dues@uppervalleydsa.org" />.
        </p>
      </Layout>
    );
  } else {
    throw new Error(`Didn't expect to recieve hash: ${hash}`);
  }
};

export default Members;
