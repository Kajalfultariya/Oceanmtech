import React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import heroimage from "../Image/hero-right-banner.png";


const Home = () => {
    return (        
        <section id="Home" className="wap-hide">
            <div  className="hero-banner">
                <div className='container-inner'>
                    <div className='hero-main'>
                        <div className='hero-left'>
                            <h1><strong>More than 100,000+</strong> Creative Marketing Images</h1>
                            <p>Whether you have a small and medium business, get all required marketing stuff in a few clicks. Easiest way to promote your business.</p>
                           {/* <Button variant="contained">download free post now</Button>*/}
                        </div>
                        <figure>
                            <img height="60" width="65" src={heroimage}/>
                        </figure>
                    </div>
                </div>  
            </div>

            <div className="register-post">
                <div className="container-inner">
                    <div className="post-count">
                        <div className="post-column">
                            <h3>1,559,658+</h3>
                            <p>Business Registered</p>
                        </div>
                        <div className="post-column">
                            <h3>7,844,980+</h3>
                            <p>Post Download</p>
                        </div>
                        <div className="post-column">
                            <h3>1,055,1585+</h3>
                            <p>Creative Option</p>
                        </div>
                    </div>
                </div>
            </div>               
        </section >
    )
}

export default Home;