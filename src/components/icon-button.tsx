import { ComponentProps } from "react";

interface iconButtonProps extends ComponentProps<'button'>{
    children: any,
    transparent?: boolean,
    disable?: boolean
}

export function IconButton({transparent, ...props}: iconButtonProps){
    return (
        <button {...props} 
        className={`${transparent === true ? "bg-black/20 " : "bg-white/20"}` 
        + " border border-white/10 rounded-md p-1.5 " 
        + `${props.disabled === true ? "opacity-50" : ""}`}>
            {props.children}
        </button>
    )
}