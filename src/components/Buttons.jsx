const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.handlePrevious}>Previous</button>
      <button onClick={props.handleNext}>Next</button>
    </div>
  );
};

export default Buttons;
