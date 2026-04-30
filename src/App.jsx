import React from 'react'
import './App.css'
import LandingPage from './MainComponents/LandingPage'
import { Routes, Route } from "react-router-dom"; 
import Blog from './MainComponents/Blog';
import Video from './MainComponents/Video';
import AdminPanel from './admin/AdminPanel';
import CreateBlog from './admin/CreateBlog';
import CreateVideo from './admin/CreateVideo';
import Register from './MainComponents/Register';
import Login from './MainComponents/Login';
import ForgetPassword from './MainComponents/ForgetPassword';
import Profile from './MainComponents/Profile';
import AdminLogin from './admin/AdminLogin';
import ViewBlogs from './admin/ViewBlogs';
import ViewVideos from './admin/ViewVideos';
import AdminViewUser from './admin/AdminViewUser';
import ManPower from './MainComponents/ManPower';
import Internship from './MainComponents/Intership';
import LiveProjects from './MainComponents/LiveProjects';
import Placements from './MainComponents/Placements';
import SoftSkills from './MainComponents/SoftSkills';
import Curriculum from './MainComponents/Curriculum';
import LearningOutcomes from './MainComponents/LearningOutcomes';
import WorkForce from './MainComponents/WorkForce';
import BlogPage from './MainComponents/BlogPage';
import AudioLibrary from './MainComponents/AudioLibrary';
import VideoPage from './MainComponents/VideoPage';
import IndustryInsights from './MainComponents/IndustryInsights';
import BusinessEnquiry from './MainComponents/BusinessEnquiry';
import ContactUs from './MainComponents/ContactUs';
import ResumeMasterclass from './MainComponents/ResumeMasterclass';
import AboutUs from './MainComponents/AboutUs';
import CreateAudio from './admin/CreateAudio';
import ViewAudios from './admin/ViewAudios';
import AdminInternship from './admin/AdminInternship';
import AdminPlacements from './admin/AdminPlacements';
import AdminLiveProject from './admin/AdminLiveProject';
import AdminSoftSkill from './admin/AdminSoftSkill';


function App() {



  return (
    <>
    <Routes>  
      <Route path="/" element={
        <>
        
          <LandingPage />
        </>
      } />
       <Route path="/blog-page" element={<BlogPage />} />
       <Route path="/video-page" element={<VideoPage />} />
       <Route path="/audio-library" element={<AudioLibrary />} />
       <Route path="/industry-insights" element={<IndustryInsights />} />
       <Route path="/business-enquiry" element={<BusinessEnquiry />} />
       <Route path="/soft-skills-training" element={<SoftSkills/>} />
       <Route path="/soft-skills-training/curriculum" element={<Curriculum/>} />
       <Route path="/soft-skills-training/outcomes" element={<LearningOutcomes/>} />
       <Route path="/blog/:id" element={<Blog />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/admin/blogs" element={<ViewBlogs />} />
      <Route path="/admin/videos" element={<ViewVideos />} />
      <Route path="/admin/audios" element={<ViewAudios />} />
      <Route path="/admin/users" element={<AdminViewUser />} />
      <Route path="/admin/create-blog" element={<CreateBlog />} />
      <Route path="/admin/internships" element={<AdminInternship />} />
      <Route path="/admin/placements" element={<AdminPlacements />} />
      <Route path="/admin/live-project" element={<AdminLiveProject />} />
      <Route path="/admin/soft-skill" element={<AdminSoftSkill />} />
      <Route path="/admin/create-video" element={<CreateVideo />} />
      <Route path="/admin/create-audio" element={<CreateAudio />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgetPassword/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/internship" element={<Internship/>}/>
      <Route path="/live-projects" element={<LiveProjects/>}/>
      <Route path="/job-placements" element={<Placements/>}/>
      <Route path="/manpower" element={<ManPower/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="resume-builder" element={<ResumeMasterclass/>}/>
       <Route path="/workforce-insights" element={<WorkForce/>}/>
     </Routes>
    </>
  )
}

export default App
