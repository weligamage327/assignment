import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { initialOptions } from "../../data/optionsData";
import styles from "./MultiSelectDropdown.module.scss";
import DropdownItems from "../dropdownitems/DropdownItems";
import InputController from "../inputcontroller/InputController";

interface DropdownItem {
  value: string;
  categoryIcon: React.ReactNode;
  description: string;
  selected: boolean;
}

function MultiSelectDropdown() {
  const [selectedOptions, setSelectedOptions] =
    useState<DropdownItem[]>(initialOptions);
  const [newOption, setNewOption] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleItemClick = (clickedItem: DropdownItem) => {
    // Toggle the selected state of the clicked item
    const updatedOptions = selectedOptions.map((item) =>
      item.value === clickedItem.value
        ? { ...item, selected: !item.selected }
        : item
    );
    setSelectedOptions(updatedOptions);
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    // Add a new item when Enter is pressed and newOption is not empty - validating for non empty values only
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
      <h1>Assignment - Dropdown Menu</h1>
      <InputController
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onKeyDown={handleEnterKeyPress}
        setOpen={setOpen}
        open={open}
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
