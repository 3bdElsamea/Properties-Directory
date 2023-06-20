import React from 'react'
import h1  from '../../Assets/img/Home/h1.png'
import h2 from '../../Assets/img/Home/h2.png'
import h3  from '../../Assets/img/Home/h3.png'
import h4  from '../../Assets/img/Home/h4.png'
import h6  from '../../Assets/img/Home/h6.png'
import './TypesProperties.css'

const FeaturedCard = () => {
  return (
    <div className="content">
    <div className="row">
      <div className="col-3 box">
        <img src={h1} alt='' />
        <h4>name</h4>
        <label>total</label>
      </div>
      <div className="col-3 box">
        <img src={h2} alt='' />
        <h4>name </h4>
        <label>total</label>
      </div>
      <div className="col-3 box">
        <img src={h3} alt='' />
        <h4>name </h4>
        <label>total</label>
      </div>
      <div className="col-3 box">
        <img src={h4} alt='' />
        <h4>name </h4>
        <label>total</label>
      </div>
    {/* <div className="col-sm-3 box">
        <img src={h6} alt='' />
        <h4>name </h4>
        <label>total</label>
      </div> */}
    </div>
  </div>
  )
}

export default FeaturedCard
