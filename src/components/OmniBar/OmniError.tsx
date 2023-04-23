import style from "./style.module.css";

export const OmniError = ({error}: { error?: Record<string, string> }) => {
  return (
      <div className={style.error}>
        <span>{error?.amount}</span>
        <span>{error?.label}</span>
      </div>
  );
};
