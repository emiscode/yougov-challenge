import { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "universal-cookie";

function useCookies(key: string, initialValue: any) {
  const cookies = useMemo(() => new Cookies(), []);

  const readCookie = useCallback(() => {
    const cookieValue = cookies.get(key);
    if (cookieValue) return cookieValue;

    if (initialValue) {
      cookies.set(key, initialValue);
    }
    return initialValue;
  }, [cookies, initialValue, key]);

  const [cookie, setCookieState] = useState(() => {
    return readCookie();
  });

  const setCookie = (value: any) => {
    cookies.set(key, value);
    setCookieState(value);
  };

  useEffect(() => {
    setCookieState(readCookie());
  }, [readCookie]);

  return [cookie, setCookie];
}

export default useCookies;
