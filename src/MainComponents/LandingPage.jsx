
import Footer from './Footer'
import NavBar2 from './NavBar2'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import { useState, useEffect } from 'react'
import ProblemStatement from './ProblemStatement'

const LandingPage = () => {
    const [progress, SetProgress] = useState(0);
  
    useEffect(()=>{
      const onScroll = ()=>{
        const maxScroll = window.innerWidth < 760 ? 250 : 400;
        SetProgress(Math.min(window.scrollY / maxScroll, 1))
      }
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    },[]);
    
    return (
    <>
       <Screen1 progress={progress} />
      <NavBar2 progress={progress} />
      <ProblemStatement />
      <Screen2 />
      <Screen3 />
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default LandingPage
