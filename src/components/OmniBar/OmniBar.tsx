import {OmniHint} from '../OmniHint';
import {ChangeEvent, useEffect, useState} from 'react';
import style from './style.module.css';
import {OmniActionType} from './OmniBar.types';
import {OmniButton} from '../OmniButton';
import {inputParser, mandatorySymbols} from '../../utils';
import {useDispatch} from 'react-redux';
import {addRecord} from '../../store/recordsSlice';

export const OmniBar = () => {
  const [type, setType] = useState<OmniActionType>(OmniActionType.add);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<Record<string, string>>();
  const dispatch = useDispatch();

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  useEffect(() => {
    setError(mandatorySymbols(input))
  }, [input]);

  const hotKeys = (e: KeyboardEvent) => {
    if (e.altKey && e.key === '/') changeOmniType();
    if (e.key === 'Enter') onOmniButton();
  };

  useEffect(() => {
    document.addEventListener('keydown', hotKeys);
    return () => document.removeEventListener('keydown', hotKeys);
  }, [hotKeys]);

  const parseInput = () => {
    if (input) dispatch(addRecord(inputParser(input)));
    setInput('');
  };

  const onSearch = () => {
    console.log(`search for ${ input }`);
  };

  const onOmniButton = () => {
    type === OmniActionType.add ? parseInput() : onSearch();
  };

  const changeOmniType = () => {
    setType(type === OmniActionType.add ? OmniActionType.search : OmniActionType.add);
  };

  return (
      <>
        <div className={style.wrapper}>
          <OmniHint type={type} cb={changeOmniType}/>
          <input
              type="text"
              onChange={onInput}
              value={input}
              className={style.bar}
              autoFocus={true}
          />
          <OmniButton
              type={type}
              cb={onOmniButton}
              disabled={!input?.trim() || Boolean(error?.amount) || Boolean(error?.label)}/>
        </div>
        <div className={style.error}>
          <span>{error?.amount}</span>
          <span>{error?.label}</span>
        </div>
      </>
  );
};
