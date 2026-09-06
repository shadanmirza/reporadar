import { useEffect, useState } from 'react'

// This is a GENERIC hook. It doesn't know about GitHub specifically.
// It just knows: "I have a function that returns a Promise, and some dependencies."
export function useGitHubData(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only skip if the FIRST dependency is empty.
    // For search, this is the query.
    const shouldSkip =
      dependencies.length > 0 &&
      (dependencies[0] === "" ||
        dependencies[0] === null ||
        dependencies[0] === undefined);

    if (shouldSkip) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    // ==========================================
    // RACE CONDITION FIX
    // ==========================================
    // If the user changes search terms quickly, we might get
    // results from an OLD request after a NEW request finishes.
    // This "cancelled" flag fixes that.
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        
        // Only update state if this request wasn't cancelled
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function: runs when component unmounts or dependencies change
    return () => {
      cancelled = true;
    }; 
  }, dependencies); // Re-run when these change

  return { data, loading, error };
}