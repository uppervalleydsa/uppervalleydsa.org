import React from 'react';
import PropTypes from 'prop-types';

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
  const width = 500;
  return (
    <iframe
      title='Facebook embed'
      src={makeEmbedSrc({ tabs, width })}
      width={width}
      height='700'
      style={{border: 'none', overflow: 'hidden'}}
      scrolling="no"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
};

FbEmbed.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FbEmbed;
