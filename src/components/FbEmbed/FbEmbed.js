import React from 'react';
import PropTypes from 'prop-types';
import useMeasure from 'react-use-measure'

import { wrapper, iframe } from './fbembed.module.css';

const makeEmbedSrc = (params) => {
  const baseParams = {
    href: 'https://www.facebook.com/UpperValleyDSA/',
    small_header: true,
    adapt_container_width: true,
    hide_cover: true,
    show_facepile: false,
    appId: 682071559411987,
    ...params,
  };

  // interesting that we can use URLSearchParams even in gatsby node rendering
  return `https://www.facebook.com/plugins/page.php?${new URLSearchParams(baseParams)}`
}

const FbEmbed = ({ tabs }) => {
  const [ref, bounds] = useMeasure();
  return (
    <div className={wrapper} ref={ref}>
      <iframe
        title='Facebook embed'
        src={makeEmbedSrc({ tabs, width: Math.min(bounds.width, 500) })}
        width={Math.min(bounds.width, 500)}
        height='700'
        className={iframe}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </div>
  );
};

FbEmbed.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FbEmbed;
