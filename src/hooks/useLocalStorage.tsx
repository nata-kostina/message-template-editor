import { Dispatch, SetStateAction, useCallback, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage <T>(storageKey: string, fallbackState: T): [storedValue: T, setValue: SetValue<T>] {
    // Get from local storage then parse stored json or return initialValue
    const readValue = useCallback((): T => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window === "undefined") {
            return fallbackState;
        }

        try {
            const item = window.localStorage.getItem(storageKey);
            return item ? (parseJSON(item) as T) : fallbackState;
        } catch (error) {
            console.warn(`Error reading localStorage key “${storageKey}”:`, error);
            return fallbackState;
        }
    }, [fallbackState, storageKey]);
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue: SetValue<T> = useCallback((value) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(storageKey, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
        } catch (error) {
            console.warn(`Error setting localStorage key “${storageKey}”:`, error);
        }
    }, [storageKey, storedValue]);

    return [storedValue, setValue];
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value === "undefined" ? undefined : JSON.parse(value ?? "");
    } catch {
        console.log("parsing error on", { value });
        return undefined;
    }
}
