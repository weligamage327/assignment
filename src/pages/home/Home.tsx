import MultiSelectDropdown from "../../components/multiselectdropdown/MultiSelectDropdown";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <MultiSelectDropdown />
    </div>
  );
}

export default Home;
