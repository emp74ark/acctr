import style from './style.module.css';
import React from "react";
export const RecordHeader = () => {
  return (
      <div className={`${style.record} ${style.records__header}`}>
        <span>date</span>
        <span>label</span>
        <span>amount</span>
        <span>tags</span>
        <span>actions</span>
      </div>
  );
};
