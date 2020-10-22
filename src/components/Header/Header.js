import React, { useState, useContext } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';

import { PreviewContext } from '../../constants';
import {
  header,
  title as titleStyle,
  titleLink,
  navbarLink,
  hotlinks,
  hotlink,
  coldlink,
  mobileBurger,
  burgerLines,
  active,
  mobileHotlinks,
  logoDiv,
  hidesNestedItems,
  nestedNavItems,
} from './header.module.css';
import logo from '../../images/logo.png';

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

const noLinks = {
  markdownRemark: {
    frontmatter: {
      links: [],
    },
  },
};

const HeaderItem = ({ url, title, onClick }) => (
  <li key={url} className={hotlink} tabIndex="-1" role="menuitem">
    <AmbiguousLink className={navbarLink} to={url} onClick={onClick}>
      {title}
    </AmbiguousLink>
  </li>
);

const NestedHeaderItem = ({ topTitle, nestedItems, onClick }) =>
  nestedItems.length === 1 ? (
    <HeaderItem
      url={nestedItems[0].url}
      title={nestedItems[0].title || topTitle}
      onClick={onClick}
    />
  ) : (
    <li className={classNames(hotlink, hidesNestedItems)}>
      <span className={classNames(coldlink, navbarLink)}>{topTitle}</span>
      <ul className={nestedNavItems}>
        {nestedItems.map(({ subtitle, url }) => (
          <HeaderItem key={url} url={url} title={subtitle} onClick={onClick} />
        ))}
      </ul>
    </li>
  );

const Header = () => {
  const preview = useContext(PreviewContext);
  const data = preview
    ? noLinks
    : useStaticQuery(graphql`
        query {
          markdownRemark(fileAbsolutePath: { regex: "/layout/header.md$/" }) {
            frontmatter {
              links {
                title
                sublinks {
                  subtitle
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
    (prev, { title, sublinks }) => ({
      ...prev,
      [title]: sublinks,
    }),
    {},
  );

  return (
    <header className={header} role="menubar">
      <img className={logoDiv} src={logo} alt="" />
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
        {Object.entries(navItems).map(([linkTitle, nestedItems]) => (
          <NestedHeaderItem
            key={linkTitle}
            topTitle={linkTitle}
            nestedItems={nestedItems}
            onClick={menuCloseOnClick}
          />
        ))}
      </ul>
    </header>
  );
};

export default Header;
