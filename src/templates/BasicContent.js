import React from 'react';

import Layout from '../components/Layout';
import Signup from '../components/Signup';

const widgetComponents = {
  Signup,
};

/* eslint-disable react/no-danger */
export default ({ title, html, children, widgets }) => {
  const ifHtml = html ? { dangerouslySetInnerHTML: { __html: html } } : {};
  const requestedComponents = (widgets || []).map((name) =>
    React.createElement(widgetComponents[name], { key: name }),
  );
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div {...ifHtml}>{children}</div>
        {requestedComponents}
      </div>
    </Layout>
  );
};
