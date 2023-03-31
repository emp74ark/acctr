import { OmniBar } from '../../components';
import React from 'react';
import style from './style.module.css';

export const Home = () => {
  return (
     <div className={ style.home }>
       <OmniBar/>
       <ul className={ style.help }>
         <li>change input type: Alt + '/'</li>
         <li>'#' - tags</li>
         <li>'*' - amount</li>
       </ul>
     </div>
  );
};
