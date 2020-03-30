import React from 'react';
import CMS from 'netlify-cms-app';

import BasicContent from './templates/BasicContent';

const Preview = ({ entry, widgetFor }) => {
  return (
    <BasicContent {...entry.toJS().data}>{widgetFor('body')}</BasicContent>
  );
};

CMS.registerPreviewTemplate('about', Preview);
CMS.registerPreviewTemplate('contact', Preview);
CMS.registerPreviewTemplate('organizing', Preview);
