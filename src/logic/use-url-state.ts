import { useState } from "react";

type convertToStr<T> = (param: T) => string;
type convertToType<T> = (param: string) => T;

type useUrlStateReturnType<T> = [T, (newValue: T) => void, () => void];

export function useUrlState<T>(param: string, initial: T, strToType: convertToType<T>, typeToStr: convertToStr<T> = (v) => String(v)) : useUrlStateReturnType<T> {
    const getUrl = () => new URL(window.location.toString());
    const hasQuery = (url: URL) => ![null, "", "null"].includes(url.searchParams.get(param))

    const [state, setState] = useState<T>(() => {
        const url = getUrl();

        if(hasQuery(url)) 
            return strToType(url.searchParams.get(param)!);

        return initial;
    });

    const setCurrentState = function (newValue: T) : void {
        const url = getUrl();

        url.searchParams.set(param, typeToStr(newValue));

        window.history.pushState({}, "", url);
        setState(newValue)
    }

    const hiddenState = function () : void {
        const url = getUrl();

        if(url.searchParams.has(param)){
            url.searchParams.delete(param);
            window.history.pushState({}, "", url);
        }
            
    }

    return [state, setCurrentState, hiddenState];
}