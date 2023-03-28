import { OmniHint } from '../OmniHint';
import { ChangeEvent, useEffect, useState } from 'react';
import style from './style.module.css';
import { OmniActionType } from './OmniBar.types';
import { OmniButton } from '../OmniButton';

export const OmniBar = () => {
  const [type, setType] = useState<OmniActionType>(OmniActionType.add);
  const [input, setInput] = useState<string>();

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  useEffect(() => {
    input?.startsWith('/')
        ? setType(OmniActionType.search)
        : setType(OmniActionType.add);
  }, [input]);

  return (
      <div className={ style.wrapper }>
        <OmniHint type={ type }/>
        <input type="text" onChange={ onInput } className={ style.bar }/>
        <OmniButton type={ type }/>
      </div>
  );
};
