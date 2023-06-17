import React from "react"
import '../../Components/TypesProperties/TypesProperties.css'
const HeadingTypes = ({ title, subtitle }) => {
  return (
    <>
      <div className='heading'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  )
}

export default HeadingTypes