import React from 'react';

import Layout from '../components/Layout';

/* eslint-disable react/no-danger */
export default ({ title, html, children }) => {
  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div {...ifHtml}>{children}</div>
      </div>
    </Layout>
  );
};
