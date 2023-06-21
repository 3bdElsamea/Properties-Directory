import React from 'react'
import h1  from '../../Assets/img/Home/h1.png'
import h2 from '../../Assets/img/Home/h2.png'

import './TypesProperties.css'

const FeaturedCard = () => {
  return (
    <div className="contentt">
    <div className="row">
      <div className="col-6 box">
        <img src={h1} alt='' />
        <h4>For Rent</h4>
        <label>total</label>
      </div>
      <div className="col-6 box">
        <img src={h2} alt='' />
        <h4>For Sell </h4>
        <label>total</label>
      </div>
    
    </div>
  </div>
  )
}

export default FeaturedCard
