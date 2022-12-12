import React, { useState, useEffect } from 'react';
import oclogo from "../Image/footer-logo.svg"
import facebook from "../Image/facebook.svg"
import tweeter from "../Image/twitter.svg"
import linkedin from "../Image/linkedin.svg"
import insta from "../Image/insta.svg"
import uparrow from "../Image/up-arrow.svg"
import { getLandingData } from '../API';
import Link from '@mui/material/Link';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useHistory } from 'react-router';

const Footer = () => {
    const [linkData, setLinkData] = useState([])
    const history = useHistory();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await getLandingData()

        response?.data?.map((item) => {
            if (item?.slug == "social-links") {
                setLinkData(item?.value)
            }
        })
    }

    return (
        <footer id="Footer">
            <div className="footer-main">
                <div className="f-left">
                    <figure><img src={oclogo} height="90" width="90" /></figure>
                    <p>Copyright @ 2022@All rights resevered.</p>
                </div>

                <div className="f-mid">
            
                    <Link onClick={() => {
                         history.push("/privacy-policy")
                          }}>Privacy Policy</Link> |
                    <Link onClick={() => { history.push("/terms-condition") }}>Terms & Condition</Link> |
                    <Link onClick={() => { history.push("/refund-policy") }}>Refund Policy</Link>
                    {/*| <Link href="/faq">Faqs</Link>*/}
                </div>

                <div className="f-right">
                    <div className="f-social">
                        <Link onClick={() => { window.location.href = linkData?.facebook }} ><img src={facebook} height="90" width="90" /></Link>
                        <Link onClick={() => { window.location.href = linkData?.twitter }}><img src={tweeter} height="90" width="90" /></Link>
                        <Link onClick={() => { window.location.href = linkData?.linkedin }}><img src={linkedin} height="90" width="90" /></Link>
                        <Link onClick={() => { window.location.href = linkData?.pintrest }}><img src={insta} height="90" width="90" /></Link>
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
    )
}

export default Footer;