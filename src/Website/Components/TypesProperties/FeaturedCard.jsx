import React from 'react'
import hh1  from '../../Assets/img/Home/h1.png'
import hh2 from '../../Assets/img/Home/h2.png'

import './TypesProperties.css'

const FeaturedCard = () => {
  return (
    <div class="row">
      <div class="col-5 box">
        <img src={hh1} alt='' />
        <h2> <a href='/properties/rent'> For Rent</a> </h2> 
      </div>
      <div class="col-5 box">
        <img src={hh2} alt='' />
       <h2> <a href='/properties/sell'> For Sell </a> </h2> 
      </div>
    
    </div>
 
  )
}

export default FeaturedCard


