const Input = ({ type, name, value, id, handleChange }) => {
    return (
      <input
        type={type}
        name={name} // Ensure that the name attribute is correctly passed
        value={value}
        id={id}
        onChange={handleChange}
      />
    );
  };
  
  export default Input;
  