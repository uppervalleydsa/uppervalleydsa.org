import React from 'react';
import { Helmet } from 'react-helmet';

const Redirect = ({ pageContext }) => (
  <Helmet>
    <meta httpEquiv="refresh" content={`0;URL='${pageContext.to}'`} />
  </Helmet>
);

export default Redirect;
