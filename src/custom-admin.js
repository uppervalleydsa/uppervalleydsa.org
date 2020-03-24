import React from 'react';
import CMS from 'netlify-cms-app';

import BasicContent from './templates/BasicContent';

const Preview = ({ entry, widgetFor }) => {
  const { title } = entry.toJS().data;
  return <BasicContent title={title}>{widgetFor('body')}</BasicContent>;
};

CMS.registerPreviewTemplate('about', Preview);
CMS.registerPreviewTemplate('contact', Preview);
CMS.registerPreviewTemplate('organizing', Preview);
