import React, { useId, useRef } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import classes from "./SearchPill.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  /** Accessible name, e.g. "Rassen durchsuchen" */
  label: string;
  placeholder: string;
  className?: string;
}

/** Search field in a pill, with a clear button while it has a value */
const SearchPill = ({ value, onChange, label, placeholder, className }: Props) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className ? `${classes.search} ${className}` : classes.search}>
      <IconSearch size={18} className={classes.icon} aria-hidden />
      <label htmlFor={id} className="rp-visually-hidden">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="search"
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        autoComplete="off"
        enterKeyHint="search"
      />
      {value && (
        <button
          type="button"
          className={classes.clear}
          aria-label="Suche leeren"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
        >
          <IconX size={16} aria-hidden />
        </button>
      )}
    </div>
  );
};

export default SearchPill;
