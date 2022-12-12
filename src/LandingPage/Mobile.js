import React from 'react';
import appstore from "../Image/appstore.png"
import googleplay from "../Image/googleplay.png"
import heroimage from "../Image/hero-right-banner.png";


const Mobile = () => {
  return (

    <div className="desk-hide">
      <div className="app-icon">
        <div className="container-inner">
          <div className="group-heading">
            <h2>Make your life easy</h2>
          </div>
          <div className="app-icon-links">
            <img src={appstore}
              onClick={() => {
                window.location.href =
                  "https://apps.apple.com/app/capsigo/id1547746310"
              }}></img>
            <img src={googleplay} // style={{ height: "50px", width: "250px" }}
              onClick={() => {
                window.location.href =
                  "https://play.google.com/store/apps/details?id=com.tetraz.capsigo"
              }}></img>
          </div>
        </div>
      </div>

      <div className="mobile-hero">
        <div className="container-inner">
          <div className="group-heading" style={{ marginBottom: "20px" }}>
            <p>by our app by our app by our app by our app by our appby our app by our app by our app</p>
          </div>
          <figure>
            <img src={heroimage} />
          </figure>
        </div>
      </div>
    </div>

  )
}

export default Mobile;