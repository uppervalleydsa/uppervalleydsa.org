import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import Dues from '../components/Dues';
import SEO from '../components/seo';
import Mailto from '../components/Mailto';

/* eslint-disable react/no-danger */
const Members = ({ data }) => (
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
      <span>Optional monthly dues help sustain the chapter&#39;s </span>
      <Link to="/issues">organizing priorities</Link>
      <span> and fund mutual aid projects. </span>
      <span>
        These dues are separate from any membership dues paid to National DSA.
        Click below to set up dues payment with a credit or debit card.
        Questions about dues (including cancellation) can be directed to
      </span>
      <span> </span>
      <Mailto address="dues@uppervalleydsa.org" />.
    </p>
    <p>You can enroll in dues at any of the following tiers, paid monthly:</p>
    <Dues prices={data.prices.edges} />
  </Layout>
);

export const query = graphql`
  query getDuesProduct {
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

export default Members;
