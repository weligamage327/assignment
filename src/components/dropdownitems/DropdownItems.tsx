import React from "react";
import { Check } from "@mui/icons-material";
import styles from "./DropdownItems.module.scss";

interface DropdownItem {
  selected: boolean;
  value: string;
  description: string;
  categoryIcon: React.ReactNode;
}

interface DropdownItemsProps {
  selectedOptions: DropdownItem[];
  handleItemClick: (item: DropdownItem) => void;
  setNewOption: (value: string) => void;
}

function DropdownItems({
  selectedOptions,
  handleItemClick,
  setNewOption,
}: DropdownItemsProps) {
  // Function to handle item click with value update
  const handleItemClickWithValue = (item: DropdownItem) => {
    handleItemClick(item);

    if (!item.selected) {
      setNewOption(item.value);
    } else {
      setNewOption("");
    }
  };

  return (
    <>
      {selectedOptions.map((item, index) => (
        <div
          key={index}
          className={
            item.selected ? `${styles.item} ${styles.selected}` : styles.item
          }
          onClick={() => handleItemClickWithValue(item)} // Handle item click with value update
        >
          <div>
            <span className={styles.itemText}>
              {item.selected ? item.description : item.value}
            </span>
            <span>{item.categoryIcon}</span>
          </div>
          {item.selected && <Check className={styles.selectedIcon} />}
        </div>
      ))}
    </>
  );
}

export default DropdownItems;
