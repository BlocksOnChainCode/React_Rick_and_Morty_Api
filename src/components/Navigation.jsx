// ! Navigation component
// ? This component is used to display the navigation bar for the app.
// ? It is used taking in the setCurrentTab function as props from the App component.
const Navigation = (props) => {
  return (
    <nav>
      <button onClick={(e) => props.handleNavigation(e)}>Characters</button>
      <button onClick={(e) => props.handleNavigation(e)}>Episodes</button>
      <button onClick={(e) => props.handleNavigation(e)}>Locations</button>
    </nav>
  );
};

export default Navigation;
