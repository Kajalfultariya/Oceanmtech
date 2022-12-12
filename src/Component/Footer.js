import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
import oclogo from "../Image/footer-logo.svg"
import facebook from "../Image/facebook.svg"
import tweeter from "../Image/twitter.svg"
import linkedin from "../Image/linkedin.svg"
import insta from "../Image/insta.svg"
import uparrow from "../Image/up-arrow.svg"


import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <>
            <footer id="Footer" className="footer-inner">
                <div className="footer-main">
                    <div className="f-left">
                        <figure><img src={oclogo} height="90" width="90" /></figure>
                        <p>Copyright @ 2022@All rights resevered.</p>
                    </div>

                    <div className="f-mid"><Link href="#">Privacy Policy</Link> | <Link href="#">Terms & Condition</Link> | <Link href="#">Refund Policy</Link> | <Link href="#">Faqs</Link></div>

                    <div className="f-right">
                        <div className="f-social">
                            <Link href="#"><img src={facebook} height="90" width="90" /></Link>
                            <Link href="#"><img src={tweeter} height="90" width="90" /></Link>
                            <Link href="#"><img src={linkedin} height="90" width="90" /></Link>
                            <Link href="#"><img src={insta} height="90" width="90" /></Link>
                        </div>
                        <div className="back-top">
                        <Link ><img src={uparrow} height="90" width="90"
                            onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }} /></Link>
                    </div>
                    </div>

                </div>
            </footer>

            <div style={{
                display: "none",
                width: "98%",
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgb(1, 61, 129)"
            }}>

                <div style={{
                    fontSize: "0.85rem",
                    marginLeft: "20px",

                }}>
                    Copyright @2021 All rights reserved
                </div>
                <div style={{
                    fontSize: "0.85rem",
                    marginLeft: "35px",

                }}>
                    <strong>   Privacy Policy | Terms & condition | Refund Policy | Faqs </strong>
                </div>
                <div>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Avatar
                            style={{
                                height: "35px",
                                width: "35px",
                                marginTop: "15px"
                            }}

                            alt="facebook"
                            src={facebook}
                        />
                        <Avatar
                            style={{
                                height: "35px",
                                width: "35px",
                                marginTop: "15px"
                            }}

                            alt="tweeter"
                            src={tweeter}
                        />
                        <Avatar
                            style={{
                                height: "35px",
                                width: "35px",
                                marginTop: "15px"
                            }}

                            alt="linkedin"
                            src={linkedin}
                        />
                        <Avatar
                            style={{
                                height: "35px",
                                width: "35px",
                                marginTop: "15px"
                            }}

                            alt="insta"
                            src={insta}
                        />
                      
                    </Stack>


                </div>
            </div>

        </>
    )
}

export default Footer;