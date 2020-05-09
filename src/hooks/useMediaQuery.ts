import { useEffect, useState } from 'react';

const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const changeHandler = () => setIsMatch(mediaQueryList.matches);

    mediaQueryList.addListener(changeHandler);

    changeHandler();

    return () => {
      mediaQueryList.removeListener(changeHandler);
    };
  }, [mediaQuery]);

  return isMatch;
};

export default useMediaQuery;
