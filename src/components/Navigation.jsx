// ! Navigation component
// ? This component is used to display the navigation bar for the app.
// ? It is used taking in the setCurrentTab function as props from the App component.
const Navigation = (props) => {
  return (
    <nav>
      <button onClick={() => props.setCurrentTab("characters")}>
        Characters
      </button>
      <button onClick={() => props.setCurrentTab("episodes")}>Episodes</button>
      <button onClick={() => props.setCurrentTab("locations")}>
        Locations
      </button>
      <input type="text" />
    </nav>
  );
};

export default Navigation;
