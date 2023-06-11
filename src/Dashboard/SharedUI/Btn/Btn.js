const Btn = ({title,className, onClick, style}) => {

    return(

        <button type="submit" style={style} className={className} onClick={onClick}>{title}</button>

    )

}

export default Btn;