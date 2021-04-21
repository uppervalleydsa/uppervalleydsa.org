import React from 'react';
import classNames from 'classnames';

import { spinWrap, spinner } from './spinner.module.css';

const Spinner = ({ className, color }) => {
  const styleOverrides = {};
  if (color) {
    styleOverrides.borderColor = `${color} transparent ${color} ${color}`;
  }

  return (
    <div className={classNames(spinWrap, className)}>
      <div className={spinner} style={styleOverrides} />
    </div>
  );
};

export default Spinner;
