import React from 'react';

const GOOGLE_CALENDAR = 'en.usa%23holiday%40group.v.calendar.google.com';

const Calendar = () => (
  <iframe
    title="Google Calendar embed"
    src={`https://calendar.google.com/calendar/embed?src=${GOOGLE_CALENDAR}&ctz=America%2FNew_York`}
    style={{ border: 0 }}
    width="800"
    height="600"
    frameBorder="0"
    scrolling="no"
  />
);

export default Calendar;
