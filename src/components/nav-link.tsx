import { ComponentProps } from "react";

interface navListProps extends ComponentProps<'a'>{
    children: string,
    active?: boolean,
}

export function NavList({active, ...props}: navListProps){
    return (
        <a {...props} 
        className={active === true ? "font-medium text-sm cursor-pointer" : "font-medium text-sm cursor-pointer text-zinc-300"}>{props.children}</a>
    )
}