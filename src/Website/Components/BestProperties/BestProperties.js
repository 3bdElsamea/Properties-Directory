import React from 'react'
import Apt1 from '../../Assets/img/Home/apt1.jpeg'
import Apt2 from '../../Assets/img/Home/apt2.jpeg'
import Apt3 from '../../Assets/img/Home/apt3.jpeg'

import  './BestProperties.css'

const BestProperties = () => {
  return (
    <div className='best'>
    <h1>Find Best Rated Properties</h1>
    <div>
        <p><span className='bold'>All</span></p>
        <p>Commercial</p>
        <p>Residential</p>
        <p>Agricultural</p>
    </div>
    <div className='container'>
        <div className='property'>     
        <img src={Apt1} alt='' />
        <div className='property-details'>

            <h3>Title:property1</h3>
              <p>price:20000$</p>
        </div>
        </div>
        <div className='property'>     
        <img src={Apt2} alt='' />
        <div className='property-details'>

            <h3>Title:property1</h3>
              <p>price :20000$</p>
        </div>
        </div>
        <div className='property'>     
        <img src={Apt3} alt='' />
        <div className='property-details'>

            <h3>Title:property1</h3>
              <p>price:20000$</p>
        </div>
        </div>
        
    </div>
    <button className='btn'>View All</button>
</div>
  )
}

export default BestProperties
