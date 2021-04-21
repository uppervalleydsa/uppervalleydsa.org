import React from 'react';

import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import { footer, socials, socialItem } from './footer.module.css';

const Footer = () => (
  <footer className={footer}>
    <ul className={socials}>
      <li className={socialItem}>
        <a href="https://www.facebook.com/Upper-Valley-DSA-105727607495440/">
          <img alt="Upper Valley DSA on Facebook" src={facebook} />
        </a>
      </li>
      <li className={socialItem}>
        <a href="https://twitter.com/UV_DSA/">
          <img alt="Upper Valley DSA on Twitter" src={twitter} />
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
