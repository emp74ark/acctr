import style from "./style.module.css";
import React from "react";

export const OmniHelp = () => {
  return (
      <div className={style.help}>
        <p>
          The main idea is to save records via input using simple syntax,
          where '#'&nbsp;means tag name and '*'&nbsp;means the amount of entities.
          Than this records amount summarized by tag and can be visualized
          at statistics page.
        </p>
        <p>
          Tag name and description is mandatory. Amount is optional and
          by default it is equal to 1.
        </p>
        <p>
          It is not allowed to input more than one entity amount.
        </p>
        <p>
          Hot-key to switch between 'search' and 'add' mode is Alt + '/'.
        </p>
      </div>
  );
};
