import { useEffect, useState } from 'react';

export const useFetch = <T,>(url: string, initialValue: T): [T, boolean, boolean] => {
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    setLoad(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(true);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, load, error];
};
