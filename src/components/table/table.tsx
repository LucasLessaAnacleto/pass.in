import { ComponentProps } from "react";

interface tablePros extends ComponentProps<'table'>{}

export function Table(props: tablePros){
    return (
        <div className="w-full border border-white/10 rounded-lg">
            <table className="w-full" {...props}>
                {props.children}
            </table>
        </div>
    )
}