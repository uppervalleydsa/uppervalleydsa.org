import { Link } from 'gatsby';
import React from 'react';

import { header, inlay, title, titleLink } from './header.module.css';

const Header = () => (
  <header className={header}>
    <div className={inlay}>
      <h1 className={title}>
        <Link className={titleLink} to="/">
          Upper Valley DSA
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
