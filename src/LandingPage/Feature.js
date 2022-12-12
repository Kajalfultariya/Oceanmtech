import React from "react";
import mobile from "../Image/phone.png";
import f1 from "../Image/f1.svg";
import f2 from "../Image/f2.svg";
import f3 from "../Image/f3.svg";
import f4 from "../Image/f4.svg";
import f5 from "../Image/f5.svg";
import f6 from "../Image/f6.svg";
import f7 from "../Image/f7.svg";
import f8 from "../Image/f8.svg";

const Feature = () => {
    return (
        <section id="Feature" className="feature-main wap-hide">
            <div className="container-inner">
                <div className="group-heading">
                    <h2>Best Features</h2>
                    <p>Oceanmtech DMT is helps you to promote your business by share greeting and wishes with your brand name and logo</p>
                </div>
            
                <div className="row">
                    <div className="col-md-4">
                        <div className="feature-align">
                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Business Posts</h5>
                                    <p>You will get 200+ Marketing Post for Your Business Categories</p>
                                </div>
                                <figure><img src={f1} height="40" width="40"/></figure>
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Festival Posts</h5>
                                    <p>Get Personalized Festival Posts to be connected with your clients</p>
                                </div>
                                <figure><img src={f3} height="40" width="40"/></figure>
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Custom Templates</h5>
                                    <p>Ready to use templates which fulfil all your marketing needs</p>
                                </div>
                                <figure><img src={f5} height="40" width="40"/></figure>
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Image to Video</h5>
                                    <p>Convert your images into creative videos with our inbuilt effects</p>
                                </div>
                                <figure><img src={f7} height="40" width="40"/></figure>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 phone-image text-center">
                        <img src={mobile} height="411" width="862"/>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-align right-feature">
                            <div className="left-feature">                                
                                <div className="lf-content">
                                    <h5>One page website</h5>
                                    <p>Get your business website to stand out from your competitors</p>
                                </div>   
                                <figure><img src={f2} height="40" width="40"/></figure>                             
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>digital business card</h5>
                                    <p>Get creative business card to grab attention  of your clients</p>
                                </div>
                                <figure><img src={f4} height="40" width="40"/></figure>
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Schedule post</h5>
                                    <p>Yes, you can download and schedule post for facebook and instagram</p>
                                </div>
                                <figure><img src={f6} height="40" width="40"/></figure>
                            </div>

                            <div className="left-feature">
                                <div className="lf-content">
                                    <h5>Logo maker</h5>
                                    <p>create stunning logo which suits your business</p>
                                </div>
                                <figure><img src={f8} height="40" width="40"/></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Feature