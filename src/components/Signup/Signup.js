import React from 'react';

import { subTitle } from './signup.module.css';

const Signup = () => {
  return (
    <div>
      <h4 className={subTitle}>Subscribe to our mailing list</h4>
      <p>
        <span>Join the </span>
        <a href="https://groups.google.com/u/2/g/upper-valley-dsa-bulletins">
          Upper Valley DSA Bulletins group on Google Groups
        </a>
        <span> by sending an email to </span>
        <a href="mailto:upper-valley-dsa-bulletins+subscribe@googlegroups.com">
          upper-valley-dsa-bulletins+subscribe@googlegroups.com
        </a>
        <span>.</span>
      </p>
    </div>
  );
};

export default Signup;
