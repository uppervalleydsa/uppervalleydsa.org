import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SEO from '../components/seo';
import Mailto from '../components/Mailto';
import { redirectToCheckout } from '../utils/stripe';
import {
  dues,
  checkoutBtn,
  checkoutLoading,
  freeDuesBtn,
  spinner,
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

const Members = () => {
  const [loading, setLoading] = useState(false);
  const queryData = useStaticQuery(query);
  const { siteUrl } = queryData.site.siteMetadata;
  const [freeDues, ...paidDues] = queryData.prices.edges;

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
      <p>You can enroll in dues at any of the following tiers, paid monthly:</p>
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
                onClick={(e) =>
                  redirectToCheckout(e, node.id, setLoading, siteUrl)
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
            redirectToCheckout(e, freeDues.node.id, setLoading, siteUrl)
          }
        >
          Formal membership with waived fees is also available.
        </button>
      </div>
    </Layout>
  );
};

export default Members;
