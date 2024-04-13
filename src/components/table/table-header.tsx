import { ComponentProps } from "react";

interface tableHeaderProps extends ComponentProps<'th'>{}

export function TableHeader(props: tableHeaderProps){
    return (
        <th className="px-4 py-3 text-sm font-semibold text-left" {...props}>
            {props.children}
        </th>
    )
}