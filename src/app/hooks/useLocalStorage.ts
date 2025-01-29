"use client";

import { useCallback, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback((value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }, [key]);

  return [storedValue, setValue];
}
