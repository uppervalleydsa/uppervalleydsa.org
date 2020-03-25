import { Link } from 'gatsby';
import React, { useState } from 'react';
import classNames from 'classnames';

import {
  header,
  title,
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

const Header = () => {
  const [menuActive, toggleMenuActive] = useState(false);
  const menuCloseOnClick = () => {
    if (menuActive) toggleMenuActive(false);
  };

  const navItems = {
    About: '/about/',
    Contact: '/contact/',
    Organizing: '/organizing/',
  };

  return (
    <header className={header} role="menubar">
      <h1 className={title}>
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
          <li className={hotlink} tabIndex="-1" role="menuitem">
            <Link
              className={navbarLink}
              to={location}
              onClick={menuCloseOnClick}
            >
              {linkTitle}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
