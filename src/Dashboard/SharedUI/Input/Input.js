const Input = ({ type, placeholder, style, className, name, value, id, handleChange }) => {
  return (
    <input
      className={className}
      style={style}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      id={id}
      onChange={handleChange}
    />
  );
};

export default Input;
