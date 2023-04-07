import { useCallback, useState } from 'react';

export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus('success');
      })
      .catch((err) => {
        setError(err);
        setStatus('error');
      });
  }, [asyncFunction]);
  return { execute, status, value, error };
};
