import { NavList } from "./nav-link";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";

export function Header(){
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={nlwUniteIcon} alt="icone da nlw unite" />

            <nav className="flex items-center gap-5">
                <NavList>Eventos</NavList>
                <NavList active={true}>Participantes</NavList>
            </nav>
        </div>
    )
}