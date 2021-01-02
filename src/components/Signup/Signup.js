import React from 'react';

const slug = 'sign-up-for-the-weekly-bulletin';

const triggerEmbed = () => {
  if (!document) return;

  const anStyle = document.createElement('link');
  anStyle.type = 'text/css';
  anStyle.rel = 'stylesheet';
  anStyle.href = 'https://actionnetwork.org/css/style-embed-v3.css';

  const anScript = document.createElement('script');
  anScript.type = 'text/javascript';
  anScript.src = `https://actionnetwork.org/widgets/v3/form/${slug}?format=js&source=widget`;

  document.head.appendChild(anStyle);
  document.head.appendChild(anScript);
};

export default () => {
  return (
    <div id={`can-form-area-${slug}`} ref={triggerEmbed}>
      <a href={`https://actionnetwork.org/forms/${slug}?source=direct_link`}>
        Sign up for the weekly Bulletin
      </a>
    </div>
  );
};
