
import Footer from './Footer'
import NavBar2 from './NavBar2'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import { useState, useEffect } from 'react'
import ProblemStatement from './ProblemStatement'
import { motion, AnimatePresence } from 'motion/react'

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
    <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-40 overflow-auto bg-white"
        >
          <Screen1  />
          <NavBar2  />
          <ProblemStatement />
          <Screen2 />
          <Screen3 />
          <footer>
            <Footer />
          </footer>
        </motion.div>
    </AnimatePresence>
  )
}

export default LandingPage
