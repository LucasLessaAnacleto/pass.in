export function useDebounce<T>(callback: Function, delay: number ) {

    let timeoutId: number | undefined;
    
    const debounced = (args: T) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(args);
            timeoutId = undefined;
        },delay || 1500);   
    };
    
    return debounced; 
}