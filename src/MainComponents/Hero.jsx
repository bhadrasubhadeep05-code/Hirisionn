import React from 'react'
import '../MainCss/Hero.css'
import HeroImage from '../assets/HeroImage.jpg'
const Hero = () => {
  return (
    <>
      <div className="Hero">
        <img className='HeroImg' src={HeroImage} alt="" />
        <div className="HeroText">
          <div className="Tagline">Where Excellence <br/> Finds Opportunity</div>
          <div className="HeroTag2">The leading executive placement <br/> firm for global technology leaders</div>
          <button className='ApplyBtn'><h1 className="ApllyBtnText">Apply for job</h1></button>
        </div>
      </div>
    </>
  )
}

export default Hero
