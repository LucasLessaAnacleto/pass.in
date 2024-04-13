import { ComponentProps } from "react";

interface tableCellProps extends ComponentProps<'td'>{}

export function TableCell(props: tableCellProps){
    return (
        <td {...props} className={"px-4 py-3 text-sm text-zinc-300 "+props.className}>{props.children}</td>
    )
}