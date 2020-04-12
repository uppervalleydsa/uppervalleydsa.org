import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';

import {
  header,
  title as titleStyle,
  titleLink,
  navbarLink,
  hotlinks,
  hotlink,
  mobileBurger,
  burgerLines,
  active,
  mobileHotlinks,
} from './header.module.css';

const MenuButton = ({ toggleMenu, menuActive }) => {
  return (
    <button
      type="button"
      aria-label="expand mobile menu"
      className={mobileBurger}
      onClick={toggleMenu}
    >
      <span className={classNames(burgerLines, { [active]: menuActive })} />
    </button>
  );
};

const AmbiguousLink = ({ to, children, ...props }) =>
  to.startsWith('/') ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <a href={to} {...props}>
      {children}
    </a>
  );

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/layout/header.md$/" }) {
        frontmatter {
          links {
            link {
              title
              url
            }
          }
        }
      }
    }
  `);
  const [menuActive, toggleMenuActive] = useState(false);
  const menuCloseOnClick = () => {
    if (menuActive) toggleMenuActive(false);
  };

  const navItems = data.markdownRemark.frontmatter.links.reduce(
    (prev, { link: { title, url } }) => ({
      ...prev,
      [title]: url,
    }),
    {},
  );

  return (
    <header className={header} role="menubar">
      <h1 className={titleStyle}>
        <Link className={titleLink} to="/">
          Upper Valley DSA
        </Link>
      </h1>
      <MenuButton
        toggleMenu={() => toggleMenuActive(!menuActive)}
        aria-haspopup="true"
        aria-controls="menu-list"
        aria-expanded={menuActive} // @TODO: aria-expanded should be false when css viewport is big
        menuActive={menuActive}
      />
      <ul className={classNames(hotlinks, { [mobileHotlinks]: menuActive })}>
        {Object.entries(navItems).map(([linkTitle, location]) => (
          <li key={location} className={hotlink} tabIndex="-1" role="menuitem">
            <AmbiguousLink
              className={navbarLink}
              to={location}
              onClick={menuCloseOnClick}
            >
              {linkTitle}
            </AmbiguousLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
