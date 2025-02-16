import { useState, useEffect } from "react";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

const useFetch = <T>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: options?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            ...options?.headers,
          },
          body: options?.body || null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
