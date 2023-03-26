//! Navigation component
const Navigation = (props) => {
  return (
    <nav>
      <button onClick={() => props.setCurrentTab("episodes")}>Episodes</button>
      <button onClick={() => props.setCurrentTab("characters")}>
        Characters
      </button>
      <button onClick={() => props.setCurrentTab("locations")}>
        Locations
      </button>
      <input type="text" onChange={props.filterCharacters} />
    </nav>
  );
};

export default Navigation;
