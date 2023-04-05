import { OmniBar } from "../../components";
import React from "react";
import style from "./style.module.css";

export const Home = () => {
    return (
            <div className={style.home}>
                <OmniBar/>
                <ul className={style.help}>
                    <li>default amount is '1'</li>
                    <li>it is not allowed to define more than one amount</li>
                    <li>label (any text without '*' or '#') is mandatory</li>
                    <li>change input type: Alt + '/'</li>
                    <li>'#' - tags</li>
                    <li>'*' - amount</li>
                </ul>
            </div>
    );
};
