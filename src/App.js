import React, { useEffect, useState } from 'react';
import AllPage from './LandingPage/Allpage';
import { Switch, Route, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import "./Component/index.css";
import "./Component/indexfix.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import DMTHome from "./Component/DMTHome";
import Account from "./Component/Account";
import EventImage from "./Component/EventImage";
import Price from "./Component/Price"
import Edit from './Component/Edit';
import Custom from './Component/Custom';
import Feedback from './Component/Feedback';
import DisplayProfile from './Component/DisplayProfile';
import Profile from './Component/Profile';
import AppLanguage from './Component/AppLanguage';
import Post from './Component/Post';
import PremiumPlan from './Component/PremiumPlan';
import OrderHistory from './Component/OrderHistory';
import DigitalCard from './Component/DigitalCard';
import Business from './Component/Business';
import AddBusiness from './Component/AddBusiness';
import EditBusiness from './Component/EditBusiness';
import customFrame from './Component/CustomFrame';
import Terms from './LandingPage/Terms';
import PrivacyPolicy from './LandingPage/PrivacyPolicy';
import RefundPolicy from './LandingPage/Refundpolicy';
import Faqs from './LandingPage/Faq';
import "./LandingPage/index.css"
import Error from './Component/Error';
import HelpSupport from './Component/HelpSupport';
import Sam from './Component/Sam';
import Notification from './Component/Notification';
import Cpin from './Component/Cpin';



const token = localStorage.getItem("AuthToken");


const App = () => {
  const lm = JSON.parse(localStorage.getItem("login_time")) + 20
  var today = new Date()

  console.log("time", lm, today.getHours() + today.getMinutes())
  useEffect(() => {
    if (token) {
      if (today.getHours() + today.getMinutes() > lm) {
        console.log("clear")
        localStorage.clear();
        window.location.href = "/home"
      }
    }
  }, [token])

  const history = createBrowserHistory();
  
  return (
    <>
      <Router history={history}>
        {!token ?
          <>
            <Switch>
              <Route exact={true} path="/" component={AllPage} />
              <Route exact={true} path="/home" component={AllPage} />
              <Route exact={true} path="/terms-condition" component={Terms} />
              <Route exact={true} path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact={true} path="/refund-policy" component={RefundPolicy} />
              <Route exact={true} path="/faq" component={Faqs} />
            </Switch>
          </>
          :

          <div id="Appcom">
            <headercom>
              <Header />
            </headercom>
            <maincom>
              <div className="main-body" >
                <Switch>
                  <Route exact={true} path="/" component={DMTHome} />
                  <Route exact={true} path="/error" component={Error} />
                  <Route exact={true} path="/account" component={Account} />
                  <Route exact={true} path="/notification" component={Notification} />
                  <Route exact={true} path="/sam" component={Sam} />
                  <Route exact={true} path="/feedback" component={Feedback} />
                  <Route exact={true} path="/custom-frame" component={customFrame} />
                  <Route exact={true} path="/profile" component={DisplayProfile} />
                  <Route exact={true} path="/update-profile" component={Profile} />
                  <Route exact={true} path="/language" component={AppLanguage} />
                  <Route exact={true} path="/post" component={Post} />
                  <Route exact={true} path="/help" component={HelpSupport} />
                  <Route exact={true} path="/add-business" component={AddBusiness} />
                  <Route exact={true} path="/update-business" component={EditBusiness} />
                  <Route exact={true} path="/business" component={Business} />
                  <Route exact={true} path="/order" component={OrderHistory} />
                  <Route exact={true} path="/digital-card" component={DigitalCard} />
                  <Route exact={true} path="/pre-plan" component={PremiumPlan} />
                  <Route exact={true} path="/event-page" component={EventImage} />
                  <Route exact={true} path="/price" component={Price} />
                  <Route exact={true} path="/custom" component={Custom} />
                  <Route exact={true} path="/frame" component={Edit} />
                  <Route exact={true} path="/cpin" component={Cpin} />
                </Switch>
              </div>
            </maincom>
            <footercom >
              <Footer />
            </footercom>
          </div>
        }
      </Router>
    </>
  )
}

export default App;