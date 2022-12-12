import React, { useRef, useState } from 'react';
import ls from "../Image/login-1.svg";
import creative from "../Image/gallery.svg";
import ds from "../Image/download-share.svg";
import Feature from './Feature';

const Projects = () => {

  var p1x = parseFloat(1);
  var p1y = parseFloat(70);
  var p2x = parseFloat(180);
  var p2y = parseFloat(140);
  var mpx = (p2x + p1x) * 0.5;
  var mpy = (p2y + p1y) * 0.5;
  var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
  var offset = -70;
  var c1x = mpx + offset * Math.cos(theta);
  var c1y = mpy + offset * Math.sin(theta);
  const curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;


  var p1x1 = parseFloat(2);
  var p1y1 = parseFloat(130);
  var p2x1 = parseFloat(180);
  var p2y1 = parseFloat(70);
  var mpx1 = (p2x1 + p1x1) * 0.5;
  var mpy1 = (p2y1 + p1y1) * 0.5;
  var theta1 = Math.atan2(p2y1 - p1y1, p2x1 - p1x1) - Math.PI / 2;
  var offset1 = 80;
  var c1x1 = mpx1 + offset1 * Math.cos(theta1);
  var c1y1 = mpy1 + offset1 * Math.sin(theta1);
  const curve1 = "M" + p1x1 + " " + p1y1 + " Q " + c1x1 + " " + c1y1 + " " + p2x1 + " " + p2y1;


  return (
    <>
      <section id="Progress" className="progress-main wap-hide">
        <div className="container-inner">
          <div className="group-heading">
              <h3>How IT Works</h3>
              <h2>OUR WORK PROGRESS</h2>
          </div>
          <div className="word-process">
              <div className="process-col">
                  <div className="pcol-inner">
                    <figure>
                        <img src={ls} height="90" width="90"/>
                        <span>1</span>
                    </figure>
                    <h3>Login/Sign up</h3>
                    <p>Login to Oceanmtech DMT portal with your mobile number</p>
                  </div>                  
              </div>

              <div className="process-col">
                  <div className="pcol-inner">
                    <figure>
                        <img src={creative} height="90" width="90"/>
                        <span>2</span>
                    </figure>
                    <h3>Select Creatives</h3>
                    <p>We have wide range of categories to choose best marketing post</p>
                  </div>                  
              </div>

              <div className="process-col">
                  <div className="pcol-inner">
                    <figure>
                        <img src={ds} height="90" width="90"/>
                        <span>3</span>
                    </figure>
                    <h3>Download & Share</h3>
                    <p>Download and share ir on all your social media/digital platforms</p>
                  </div>                  
              </div>
          </div>
        </div>          
      </section>

      <Feature />
    </>
  )
}

export default Projects;