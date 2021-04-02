import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Mailto from '../components/Mailto';

export default ({ pageContext }) => {
  if (pageContext.success) {
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
  }

  if (pageContext.failure) {
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
  }

  return null;
};
