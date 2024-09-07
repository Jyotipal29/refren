import styles from "./filter.module.css";

const FilterBar: React.FC<FilterProps> = ({
  setSelectedSpecies,
  setSelectedStatus,
  setSelectedGender,
  selectedStatus,
  selectedGender,
  selectedSpecies,
}: FilterProps) => {
  const statuses: FilterOption[] = [
    { label: "Alive", value: "alive" },
    { label: "Dead", value: "dead" },
    { label: "Unknown", value: "unknown" },
  ];

  const genders: FilterOption[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Unknown", value: "unknown" },
  ];

  const species: FilterOption[] = [
    { label: "Human", value: "human" },
    { label: "Alien", value: "alien" },
    { label: "Unknown", value: "unknown" },
  ];

  // const types: FilterOption[] = [
  //   { label: "Human", value: "human" },
  //   { label: "Humanoid", value: "humanoid" },
  //   { label: "Animal", value: "animal" },
  // ];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterCategory}>
        <h3>Status</h3>
        {statuses.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input
              type="radio"
              name="status"
              value={option.value}
              checked={selectedStatus === option.value}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* <div className={styles.filterCategory}>
        <h3>Location</h3>
       
      </div> */}

      {/* <div className={styles.filterCategory}>
        <h3>Episode</h3>
       
      </div> */}

      <div className={styles.filterCategory}>
        <h3>Gender</h3>
        {genders.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={selectedGender === option.value}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      <div className={styles.filterCategory}>
        <h3>Species</h3>
        {species.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input
              type="radio"
              name="species"
              value={option.value}
              checked={selectedSpecies === option.value}
              onChange={(e) => setSelectedSpecies(e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* <div className={styles.filterCategory}>
        <h3>Type</h3>
        {types.map((option) => (
          <label key={option.value} className={styles.filterOption}>
            <input
              type="radio"
              name="type"
              value={option.value}
              checked={selectedType === option.value}
              onChange={() => handleChange("type", option.value)}
            />
            {option.label}
          </label>
        ))}
      </div> */}
    </div>
  );
};

export default FilterBar;
