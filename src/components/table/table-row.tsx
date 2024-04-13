import { ComponentProps } from "react";

interface tableRowProps extends ComponentProps<'tr'>{}

export function TableRow(props: tableRowProps){
    return (
        <tr className="border-b border-white/10 hover:bg-white/5" {...props}>
            {props.children}
        </tr>
    )
}