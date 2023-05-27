const Input = ({type, name, value, id, handleChange}) => {
    return(
        <input type={type} name={name} value={value} id={id} onChange={handleChange} />
    )
}

export default Input;