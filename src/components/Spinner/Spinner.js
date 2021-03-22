import React from 'react';
import classNames from 'classnames';

import { spinWrap, spinner } from './spinner.module.css';

export default ({ className }) => {
  return (
    <div className={classNames(spinWrap, className)}>
      <div className={spinner} />
    </div>
  );
};
