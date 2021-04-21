import React from 'react';

const Mailto = ({ address }) => <a href={`mailto:${address}`}>{address}</a>;
export default Mailto;
