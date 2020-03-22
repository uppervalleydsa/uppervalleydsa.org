import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { header, inlay, title, titleLink } from './header.module.css';

const Header = ({ siteTitle }) => (
  <header className={header}>
    <div className={inlay}>
      <h1 className={title}>
        <Link className={titleLink} to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
