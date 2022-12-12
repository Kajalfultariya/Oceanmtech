import React from 'react';
import Header from './Header';
import Home from './Home';
import Progress from './Progress';
import Payment from './Payment';
import Contact from './Contact';
import Footer from './Footer';
import Mobile from './Mobile';
import Video from './Video';


import "./index.css"

const AllPage = () => {
  return (
    <div>
      <Header />
      <Home />
      <Progress />
      <Video />
      <Payment />
      <Contact/>
      <Mobile />
      <Footer />
    </div>
  )
}

export default AllPage;