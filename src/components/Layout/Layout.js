/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import { content, wrapper } from './layout.module.css';
// @TODO: get all css into modules
import '../../styles/global.css';

const Layout = ({ children }) => {
  return (
    <div className={wrapper}>
      <Header />
      <main className={content}>
        <main>{children}</main>
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
