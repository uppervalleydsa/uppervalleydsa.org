import { useState, useEffect } from 'react';

export default () => {
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    setIsWindow(true);

    return () => setIsWindow(false);
  }, []);

  return isWindow;
};
