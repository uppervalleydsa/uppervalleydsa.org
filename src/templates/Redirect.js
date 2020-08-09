import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ pageContext }) => (
  <Helmet>
    <meta httpEquiv="refresh" content={`0;URL='${pageContext.to}'`} />
  </Helmet>
);
