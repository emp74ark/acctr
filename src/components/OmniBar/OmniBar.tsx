import {OmniHint} from "../OmniHint";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import style from "./style.module.css";
import {OmniActionType} from "./OmniBar.types";
import {OmniButton} from "../OmniButton";
import {inputParser, mandatorySymbols} from "../../utils";
import {useDispatch} from "react-redux";
import {addRecord, findRecords} from "../../store/recordsSlice";
import {OmniHelp} from "./OmniHelp";
import {OmniError} from "./OmniError";
import {SearchResults} from "../SearchResults";

export const OmniBar = () => {
  const [type, setType] = useState<OmniActionType>(OmniActionType.add);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>();
  const dispatch = useDispatch();

  const onInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  }, []);

  useEffect(() => {
    switch (type) {
      case OmniActionType.add:
        setError(mandatorySymbols(input));
        break;
      case OmniActionType.search:
        if (!input) dispatch(findRecords(""));
        break;
    }
  }, [input, type, dispatch]);

  const parseInput = useCallback(() => {
    if (input) dispatch(addRecord(inputParser(input)));
    setInput("");
  }, [input, dispatch]);

  const onSearch = useCallback(() => {
    if (input) dispatch(findRecords(input));
  }, [input, dispatch]);

  const onOmniButton = useCallback(() => {
    type === OmniActionType.add ? parseInput() : onSearch();
  }, [type, parseInput, onSearch]);

  const changeOmniType = useCallback(() => {
    setType(type === OmniActionType.add ? OmniActionType.search : OmniActionType.add);
  }, [type]);

  const hotKeys = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key === "/") changeOmniType();
    if (e.key === "Enter") onOmniButton();
  }, [changeOmniType, onOmniButton]);

  useEffect(() => {
    document.addEventListener("keydown", hotKeys);
    return () => document.removeEventListener("keydown", hotKeys);
  }, [hotKeys]);

  return (
      <>
        <div className={type === OmniActionType.add
            ? `${style.wrapper} ${style.add}`
            : `${style.wrapper} ${style.search}`}>
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
        <OmniError error={error}/>
        {type === OmniActionType.add && <OmniHelp/>}
        {type === OmniActionType.search && <SearchResults/>}
      </>
  );
};
