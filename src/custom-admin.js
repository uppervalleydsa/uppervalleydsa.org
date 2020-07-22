import React from 'react';
import CMS from 'netlify-cms-app';

import { PreviewContext } from './constants';
import BasicContent from './templates/BasicContent';
import BlogEntry from './templates/BlogEntry';

const Preview = ({ entry, widgetFor, template }) => {
  const fakeQueryResults = {
    markdownRemark: {
      frontmatter: entry.toJS().data,
    },
  };
  const templateElement = React.createElement(
    template,
    {
      widgetFor,
      data: fakeQueryResults,
    },
    widgetFor('body'),
  );
  return (
    <PreviewContext.Provider value>{templateElement}</PreviewContext.Provider>
  );
};

const PreviewBasicContent = (props) => (
  <Preview {...props} template={BasicContent} />
);

const PreviewBlogEntry = (props) => <Preview {...props} template={BlogEntry} />;

CMS.registerPreviewTemplate('about', PreviewBasicContent);
CMS.registerPreviewTemplate('contact', PreviewBasicContent);
CMS.registerPreviewTemplate('organizing', PreviewBasicContent);
CMS.registerPreviewTemplate('blog', PreviewBlogEntry);
