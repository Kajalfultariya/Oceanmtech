import React from "react";
import { useEffect, useState } from "react";
import Account from "./Account"
import wht from "../Image/Whatsapp.png"
import { Button } from "@mui/material";
import Toggle from "./Toggle";
import Switch from "./Switch";
import { Link } from 'react-router-dom'

const customFrame = (props) => {

    const data = props.history.location.state?.data;
    const [bData, setBData] = useState(data?.post?.custom)
    const [apiError, setApiError] = useState("")

    useEffect(async () => {
        /*     const response = await getCustomframeData("Post", data)
     
             console.log("customframe repoanse", response)
     x
     
             if (response) {
                 if (response?.status === 200) {
                     setBData(response?.data)
                 }
                 else if (response?.status === 401) {
                     localStorage.clear();
                     // window.location.reload();
                     window.location.href = "/"
                 }
                 else {
                     setApiError(response?.message ? response?.message : "Data not Found")
                 }
             }
             else {
                 setApiError("Some Internal Server Error")
             }*/
    }, [])
    const onToggle = async (state) => {
        if (state == true) {
            /*    setHomeFlag(false)
                setBusiName([])
                setSliderName([])
                setCatName([])
                setEventData([])
                // localStorage.setItem("ptype","Post")
                fetchGetData("Post")*/

        }
        else {
            /*   setHomeFlag(false)
               setBusiName([])
               setSliderName([])
               setCatName([])
               setEventData([])
               // localStorage.setItem("ptype","Story")
               fetchGetData("Story")*/
        }
    }

    return (
        <div className="account-main">
            <Account />
            <div className="ac-right">
            
                <div class="profile-header frame-switch">
                    <h1>Custom frame</h1>
                    <Toggle onToggle={onToggle}>
                        {({ on, onToggle }) => (
                            <div className="dmt-switch ">
                                <span>{on ? "Post" : "Story"} </span>
                                <Switch on={on} onSwitch={onToggle} />
                            </div>
                        )}
                    </Toggle>
                </div>

                <div className="custom-frame">
                    <div className="frame-area">


                        
                        <div
                            style={{
                                height: "400px",
                                width: "400px",
                                border: "2px solid black",
                                margin: "0px auto"
                            }}>

                            {bData ? bData?.length > 0 ?
                                bData?.map((item) => {
                                    return (
                                        <>


                                        </>
                                    )
                                }) : <>

                                </> :
                                <>
                                </>}
                        </div>
                    </div>

                    <div className="frame-cnt">
                        <h3>Frame Not Found</h3>
                        <p>No frames are currently available according to the details you entered.</p>
                        <p>You can contact out team by clicking on the WhatsApp button Below,our team will add the frame as per your requirment</p>
                        <div style={{ marginTop: "10px" }}>
                            <a href='https://api.whatsapp.com/send?phone=919978890905'>
                                <button variant="outlined"
                                    id="Event-right-button"
                                    style={{ textTransform: "none", backgroundColor: "lightgreen" }}>
                                    <img src={wht} style={{ height: "20px", width: "20px", marginRight: "15px" }}></img>
                                    Contact Us
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>)
}

export default customFrame;