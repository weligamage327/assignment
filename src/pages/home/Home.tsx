import MultiSelectDropdown from "../../components/multiselectdropdown/MultiSelectDropdown";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Assignment - Dropdown Menu</h1>
      <MultiSelectDropdown />
    </div>
  );
}

export default Home;
