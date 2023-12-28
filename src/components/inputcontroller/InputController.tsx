import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import styles from "./InputController.module.scss";
import { DropdownItem } from "../../types/DropdownItemTypes";

interface InputControllerProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  selectedOptions: DropdownItem[];
}

const InputController: React.FC<InputControllerProps> = ({
  value,
  onChange,
  onKeyDown,
  setOpen,
  open,
  selectedOptions,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    // Update input value when selected options change
    const selectedValues = selectedOptions
      .filter((item) => item.selected)
      .map((item) => item.value);
    setInputValue(selectedValues.join(", "));
  }, [selectedOptions]);

  // Handle input focus to set dropdown visibility
  const handleInputFocus = () => {
    setOpen(true);
  };

  // Handle input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div className={`${styles.container}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Type here..."
        onFocus={handleInputFocus}
      />
      <div
        className={styles.toggleIconWrapper}
        onClick={() => setOpen((open) => !open)}
      >
        {open ? (
          <KeyboardArrowUp className={styles.toggleIcon} />
        ) : (
          <KeyboardArrowDown className={styles.toggleIcon} />
        )}
      </div>
    </div>
  );
};

export default InputController;
