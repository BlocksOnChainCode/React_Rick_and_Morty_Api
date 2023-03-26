// ! Buttons component
// ? This component is used to display the buttons for the previous and next page
// ? It is used taking in the handleNext and handlePrevious functions as props from the App component.
const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.handlePrevious}>Previous</button>
      <button onClick={props.handleNext}>Next</button>
    </div>
  );
};

export default Buttons;
