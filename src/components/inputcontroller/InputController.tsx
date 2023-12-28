import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import styles from "./InputController.module.scss";

interface InputControllerProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const InputController: React.FC<InputControllerProps> = ({
  value,
  onChange,
  onKeyDown,
  setOpen,
  open,
}) => {
  // State to determine if the input is not empty
  const [isInputNotEmpty, setIsInputNotEmpty] = useState<boolean>(false);

  // Handle input change event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  // Update isInputNotEmpty based on the input value
  useEffect(() => {
    setIsInputNotEmpty(value.trim() !== "");
  }, [value]);

  return (
    <div
      className={`${styles.container} ${
        isInputNotEmpty ? styles.inputNotEmpty : ""
      }`}
    >
      {/* Input field */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Type here..."
      />
      {/* Toggle icon for controlling the dropdown visibility */}
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
