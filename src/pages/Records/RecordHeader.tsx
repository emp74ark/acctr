import style from './style.module.css';
import React from "react";
import {useTranslation} from "react-i18next";

export const RecordHeader = () => {
  const {t} = useTranslation()
  return (
      <div className={`${style.record} ${style.records__header}`}>
        <span>{t('date')}</span>
        <span>{t('label')}</span>
        <span>{t('amount')}</span>
        <span>{t('tags')}</span>
        <span>{t('actions')}</span>
      </div>
  );
};
