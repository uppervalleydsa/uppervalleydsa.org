import React from 'react';

import {
  wrapper,
  form,
  row,
  emailField,
  subBtn,
  subTitle,
} from './signup.module.css';

export default () => {
  const group = 'upper-valley-dsa-bulletins';
  return (
    <div className={wrapper}>
      <h4 className={subTitle}>Subscribe to our mailing list</h4>
      <form
        className={form}
        target="_blank"
        action={`http://groups.google.com/group/${group}/boxsubscribe`}
      >
        <div className={row}>
          <input
            className={emailField}
            name="email"
            placeholder="Email address"
          />
          <input
            className={subBtn}
            type="submit"
            value="Subscribe"
            name="sub"
          />
        </div>
        <div className={row}>
          <a href={`http://groups.google.com/group/${group}`}>
            See recent posts
          </a>
        </div>
      </form>
    </div>
  );
};
