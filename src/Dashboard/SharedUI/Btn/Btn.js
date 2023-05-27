const Btn = ({title, name, onClick}) => {
    return(
        <button type="submit" className={name} onClick={onClick}>{title}</button>
    )
}

export default Btn;