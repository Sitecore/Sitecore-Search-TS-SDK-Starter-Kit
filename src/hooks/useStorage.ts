import { useState } from 'react';

/**
 * Custom hook for storing and retrieving values in local storage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key used to identify the stored value.
 * @param {T} initialValue - The initial value to be stored if no value is found in local storage.
 * @returns {[T, (value: T) => void]} - An array containing the stored value and a function to update the stored value.
 * @example const [language, setLanguage] = useStorage<Language>('lang', 'en');
 */
function useStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' && window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useStorage;
