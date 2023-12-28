import React, { useState, useRef, KeyboardEvent } from "react";
import { initialOptions } from "../../data/optionsData";
import styles from "./MultiSelectDropdown.module.scss";
import DropdownItems from "../dropdownitems/DropdownItems";
import InputController from "../inputcontroller/InputController";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { DropdownItem } from "../../types/DropdownItemTypes";

function MultiSelectDropdown() {
  const [selectedOptions, setSelectedOptions] =
    useState<DropdownItem[]>(initialOptions);
  const [newOption, setNewOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside the dropdown area
  useOutsideClick(dropdownRef, (event) => {
    setOpen(false);
  });

  // Function to toggle the selected state of the clicked item
  const handleItemClick = (clickedItem: DropdownItem) => {
    const updatedOptions = selectedOptions.map((item) =>
      item.value === clickedItem.value
        ? { ...item, selected: !item.selected }
        : item
    );
    setSelectedOptions(updatedOptions);
  };

  // Function to add a new item when Enter is pressed and the newOption is not empty
  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newOption.trim() !== "") {
      const newItem: DropdownItem = {
        value: newOption,
        categoryIcon: "🌟",
        description: newOption.toLowerCase(),
        selected: false,
      };

      setSelectedOptions([...selectedOptions, newItem]);
      setNewOption(""); // Clear newOption after adding a new item
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <InputController
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={handleEnterKeyPress}
        setOpen={setOpen}
        open={open}
        selectedOptions={selectedOptions}
      />
      {open && (
        <div className={styles.dropdownContent}>
          <DropdownItems
            selectedOptions={selectedOptions}
            handleItemClick={handleItemClick}
            setNewOption={setNewOption}
          />
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
