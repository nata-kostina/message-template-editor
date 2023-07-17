/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, delay = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function debounceFn(this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
