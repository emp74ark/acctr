import style from "./style.module.css"
import { Nav } from "../Nav";

export const Header = () => {
    return (
            <header className={style.header}>
                <h1>acctr</h1>
                <Nav/>
            </header>
    );
};
