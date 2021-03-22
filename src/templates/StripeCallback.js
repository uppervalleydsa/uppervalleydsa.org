import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Mailto from '../components/Mailto';

export default ({ pageContext }) => {
  if (pageContext.success) {
    return (
      <Layout>
        <h2>Dues payment complete</h2>
        <p>
          Your dues have been processed sucessfully, and a reciept will be sent
          to your email on file.
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
        <h2>Dues payment error</h2>
        <p>
          <span>Your dues payment could not be completed. </span>
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
