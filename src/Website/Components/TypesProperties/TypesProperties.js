import React from 'react'
import FeaturedCard from "./FeaturedCard"
import './TypesProperties.css'
import HeadingTypes from '../../SharedUI/HeadingTypes/HeadingTypes'

const TypesProperties = () => {
  return (
    <div>
         <>
      <section className='featured background'>
        <div className='container'>
          <HeadingTypes title='Featured Property Types' subtitle='Find All Type of Property.' />
          <FeaturedCard />
        </div>
      </section>
    </>
    </div>
  )
}

export default TypesProperties
