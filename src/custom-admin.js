import React from 'react';
import CMS from 'netlify-cms-app';

import { PreviewContext } from './constants';
import BasicContent from './templates/BasicContent';

const Preview = ({ entry, widgetFor }) => {
  const fakeQueryResults = {
    markdownRemark: {
      frontmatter: entry.toJS().data,
    },
  };
  return (
    <PreviewContext.Provider value>
      <BasicContent data={fakeQueryResults}>{widgetFor('body')}</BasicContent>
    </PreviewContext.Provider>
  );
};

CMS.registerPreviewTemplate('about', Preview);
CMS.registerPreviewTemplate('contact', Preview);
CMS.registerPreviewTemplate('organizing', Preview);
