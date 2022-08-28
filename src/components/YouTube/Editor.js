import React from 'react';

import { previewText, previewImage } from './youtube.module.css';

// Internal id of the component
export const id = 'youtube';

// Visible label
export const label = 'YouTube Video';

// This string will appear in Markdown documents

// Fields the user need to fill out when adding an instance of the component
export const fields = [
  {
    name: 'url',
    label: 'YouTube Video URL',
    hint: 'Full, non-shortened HTTPS YouTube URL (eg: https://www.youtube.com/watch?v=OKegLmFdRFI). If the preview shows, the video works.',
    widget: 'string',
  },
];

// Pattern to identify a block as being an instance of this component
export const pattern = /^`youtube: (\S+)`$/;

// Function to extract data elements from the regexp match
export const fromBlock = (match) => {
  return {
    url: match[1],
    id: match[1].split('https://www.youtube.com/watch?v=')[1],
  };
};

// Function to create a text block from an instance of this component
export const toBlock = (obj) => {
  return `\`youtube: ${obj.url}\``;
};

// Preview output for this component. Can either be a string or a React component
// (component gives better render performance)
export const toPreview = (obj) => {
  if (!obj.id) return null;

  return (
    <div>
      <img
        className={previewImage}
        src={`//img.youtube.com/vi/${obj.id}/0.jpg`}
        alt="Youtube Video"
      />
      <p className={previewText}>
        Embedded YouTube video preview (the real version will be interactive and
        this text will not appear)
      </p>
    </div>
  );
};
