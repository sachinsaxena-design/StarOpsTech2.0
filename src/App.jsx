import React from 'react'
import Navbar from './Component/NavBar'
import Home from './Component/Home'
import Footer from './Component/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AboutUs from './Component/Pages/AboutUsPage'
import ServiceDetails from './Component/Pages/ServiceDetail'
import ExpertiseDetail from './Component/Pages/ExpertiseDetails'
import BlogMainPages from './Component/Blog/BlogMainPage'
import BlogLayout from './Component/Blog/BlogLayout'
import ContactUsPage from './Component/Pages/ContactUsPage'
import ScrollToTop from './Component/ScrollToTop'
function App() {


  return (
    <>
      <Router>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route exact path='/' element={
            <Home />
          } />
          <Route exact path='/about-us' element={
            <AboutUs />
          } />
          <Route exact path='/contact-us' element={<ContactUsPage/>}/>
          <Route exact path='/services/:slug' element={<ServiceDetails />} />
          <Route exact path='/expertise/:slug' element={<ExpertiseDetail />} />
          <Route path="/blog" element={<BlogMainPages />} />
          <Route path="/blog/:title" element={<BlogLayout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
