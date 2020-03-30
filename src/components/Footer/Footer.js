import React from 'react';

import facebook from '../../images/facebook.svg';
import { footer, socials, socialItem } from './footer.module.css';

export default () => (
  <footer className={footer}>
    <ul className={socials}>
      <li className={socialItem}>
        <a href="https://www.facebook.com/Upper-Valley-DSA-105727607495440/">
          <img alt="Upper Valley DSA on Facebook" src={facebook} />
        </a>
      </li>
    </ul>
  </footer>
);
