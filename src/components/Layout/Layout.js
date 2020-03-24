/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import { content } from './layout.module.css';

// @TODO: get all css into modules
import '../../styles/global.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={content}>
        <main>{children}</main>
        <footer>{/* TODO: build a footer with hotlinks */}</footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
