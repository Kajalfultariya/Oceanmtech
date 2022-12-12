// Header.js
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import SmallScreensNavbar from './SmallScreensNavbar';
import { useWindowWidthAndHeight } from './CustomHooks';
import oclogo from "../Image/logo.svg"
import call from "../Image/phone-call.svg"
import Button from '@mui/material/Button';


const Header = () => {
    // use our custom hook to get the the window size
    const [width, height] = useWindowWidthAndHeight();
    

    const newLocal = "wrapper";
    return (
        <header>            
            <div className='container-main'>            
                <div className="header-inner">
                    {/* <div className="header-temp"> */}
                        <a href="#" className="brand-name">
                            <img  src={oclogo} height="70" width="75" onClick={()=>{window.location.href="/"}} />
                        </a>
                        <a href="tel:+919106902181" className="header-phone">
                            <img src={call} height="20px" width="20px"></img> <span>+91 910 690 2181</span>
                        </a>
                    {/* </div> */}

                      {width > 1100 ?
                        <Navbar navClass="nav-big" linkClassName="nav-big-link" />
                        :
                        <SmallScreensNavbar navClass="nav-small" linkClassName="nav-small-link"
                        />
                         }  
             </div>
            </div>
        </header>
    )
}

export default Header;