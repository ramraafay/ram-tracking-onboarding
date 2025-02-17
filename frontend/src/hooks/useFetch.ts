import { useState, useEffect } from "react";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  token: string;
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
            Authorization: `Bearer ${options?.token}`,
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
  }, [url, options?.body, options?.headers, options?.method, options?.token]);

  return { data, loading, error };
};

export default useFetch;

/*
 * ELI5: This is a custom React hook called `useFetch` that helps in fetching data
 * from a given URL. It's like a helper function that makes web requests easier
 * in our React components.
 *
 * The hook returns an object with three properties:
 * - `data`: The response data from the fetch request.
 * - `loading`: A boolean that indicates whether the fetch is still in progress.
 * - `error`: Any error message if the fetch fails.
 *
 * Usage examples:
 *
 * Example 1: Fetching data with a GET request
 * const { data, loading, error } = useFetch<DataType>('https://api.example.com/data');
 *
 * Example 2: Fetching data with a POST request
 * const { data, loading, error } = useFetch<DataType>('https://api.example.com/data', {
 *   method: 'POST',
 *   body: JSON.stringify({ key: 'value' }),
 *   headers: { 'Custom-Header': 'value' }
 * });
 *
 * In these examples, `DataType` represents the type of data you expect from
 * the API. It helps TypeScript to understand what kind of data you'll be working with.
 */
