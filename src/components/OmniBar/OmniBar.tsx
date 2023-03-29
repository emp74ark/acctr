import { OmniHint } from '../OmniHint';
import { ChangeEvent, useEffect, useState } from 'react';
import style from './style.module.css';
import { OmniActionType } from './OmniBar.types';
import { OmniButton } from '../OmniButton';
import { inputParser, IRecord } from '../../utils/inputParser';

export const OmniBar = () => {
  const [type, setType] = useState<OmniActionType>(OmniActionType.add);
  const [input, setInput] = useState<string>();
  const [records, setRecord] = useState<IRecord[]>([]);

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  useEffect(() => {
    input?.startsWith('/')
        ? setType(OmniActionType.search)
        : setType(OmniActionType.add);
  }, [input]);

  const parseInput = () => {
    if (input) setRecord([...records, inputParser(input)]);
    setInput('');
  };

  return (
      <>
        <div className={ style.wrapper }>
          <OmniHint type={ type }/>
          <input type="text" onChange={ onInput } value={ input } className={ style.bar }/>
          <OmniButton type={ type } cb={ parseInput }/>
        </div>
        <div>
          { records.map(({ label, amount, tags }) => (
              <div>
                <span>label: { label }</span>
                <span>amount: { amount }</span>
                <span>tags: { tags.join(', ') }</span>
              </div>
          )) }
        </div>
      </>
  );
};
