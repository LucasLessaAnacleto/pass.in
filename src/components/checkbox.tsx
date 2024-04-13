import { ComponentProps } from "react";
import checkIcon from "../assets/check-icon.svg";
import "../styles/checkbox.css";

interface checkboxProps extends ComponentProps<'input'>{}

export function Checkbox(props: checkboxProps){
    return (
        <div className="checkbox">
            <input {...props} type="checkbox" name="checkbox"/>
            <label htmlFor="checkbox"> <img src={checkIcon}/> </label>
        </div>   
    )
}