import React, { Fragment, useState, useEffect, useRef } from "react";
import Switch1 from "./Switch1";
import Toggle from "./Toggle";
import BigFrame from "./BigFrame";
import BigFrame1 from "./BigFrame1";
import { getSingleBusinessData, getFrameData } from "../API";
import EventList from "./EventList";
import Error from "./Error";


const EventImage = (props) => {

    const divref = useRef();
    const [frameFlag, setFrameFlag] = useState(false)
    const [busiData, setBusiData] = useState([])
    const [fData, setFData] = useState([])
    const [fData1, setFData1] = useState([])
    const [count, setCount] = useState(props.history.location.state?.bimg);
    const [type, setType] = useState("Image");
    const [vdata, setVData] = useState("");
    const [apiError, setApiError] = useState("")

    const bussid = localStorage.getItem("BusinessId")

    const handleClick = (num, type, vv) => {

        setCount(num)
        setType(type)
        setVData(vv)
        console.log("number", num)
    };

    const onToggle = async (state) => {



        if (state) {


            localStorage.setItem("ptype", "Post")
            setFrameFlag(false)

            if (localStorage.getItem("BusinessId")) {
                const response1 = await getSingleBusinessData(localStorage.getItem("BusinessId"))


                if (response1) {
                    if (response1?.status === 200) {
                        setBusiData(response1?.data)

                        const username = response1?.data.name ? "1" : "0"
                        const busname = response1?.data.business_name ? "1" : "0"
                        const em = response1?.data.email ? "1" : "0"
                        const webs = response1?.data.website ? "1" : "0"
                        const adr = response1?.data.address ? "1" : "0"
                        const mnf = response1?.data.mobile_no ? "1" : "0"
                        const mns = response1?.data.mobile_no_2 ? "1" : "0"
                        const tag = response1?.data.business_tagline ? "1" : "0"
                        const fid = response1?.data.fb_id ? "1" : "0"
                        const iid = response1?.data.instagram_id ? "1" : "0"
                        const framid = response1?.data?.frame_type_id

                        if (response1?.data) {
                            const response = await getFrameData(username, busname, tag, em, webs, adr, mnf, mns, fid, iid, framid,
                                response1?.data?.id);

                            response?.data?.post?.map((item) => {
                                response1?.data?.frame_ids?.map((itemunder) => {
                                    if (itemunder?.frame_id == item?.id) {
                                        fData.push(item)
                                    }
                                })
                            })
                            setFrameFlag(true)
                        }
                    }
                    else if (response1?.status === 401) {
                        localStorage.clear();
                        // window.location.reload();
                        window.location.href = "/"
                    }
                    else {
                        //   setHomeFlag(true)
                        setApiError(response1?.message ? response1?.message : "Data not Found")
                    }
                }
                else {
                    setApiError("Some Internal Server Error")
                }
            }
        }
        else {

            localStorage.setItem("ptype", "Story")
            setFrameFlag(false)
            if (localStorage.getItem("BusinessId")) {

                const response1 = await getSingleBusinessData(localStorage.getItem("BusinessId"))


                if (response1) {
                    if (response1?.status === 200) {
                        setBusiData(response1?.data)
                        const username = response1?.data.name ? "1" : "0"
                        const busname = response1?.data.business_name ? "1" : "0"
                        const em = response1?.data.email ? "1" : "0"
                        const webs = response1?.data.website ? "1" : "0"
                        const adr = response1?.data.address ? "1" : "0"
                        const mnf = response1?.data.mobile_no ? "1" : "0"
                        const mns = response1?.data.mobile_no_2 ? "1" : "0"
                        const tag = response1?.data.business_tagline ? "1" : "0"
                        const fid = response1?.data.fb_id ? "1" : "0"
                        const iid = response1?.data.instagram_id ? "1" : "0"
                        const framid = response1?.data?.frame_type_id

                        if (response1?.data) {
                            const response = await getFrameData(username, busname, tag, em, webs, adr, mnf, mns, fid, iid, framid,
                                response1?.data?.id);
                            response?.data?.story?.map((item) => {
                                response1?.data?.story_frame_ids?.map((itemunder) => {
                                    if (itemunder?.frame_id == item?.id) {
                                        fData1.push(item)
                                    }
                                })
                            })
                            setFrameFlag(true)
                        }
                    }
                    else if (response1?.status === 401) {
                        localStorage.clear();
                        // window.location.reload();
                        window.location.href = "/"
                    }
                    else {
                        //   setHomeFlag(true)
                        setApiError(response1?.message ? response1?.message : "Data not Found")
                    }
                }
                else {
                    setApiError("Some Internal Server Error")
                }
            }

        }
    };


    useEffect(async () => {

        if (localStorage.getItem("ptype") === "Post") {
            onToggle(true)
        }
        else {
            onToggle(false)
        }
    }, [localStorage.getItem("BusinessId")])




    return (
        <Fragment>
            <div className="event-list">
                {
                    apiError !== undefined && (
                        <Error data={apiError}/>
                    )
                }

                <div className="event-left-sidebar">

                    {console.log("props anme", bussid)}
                    <Toggle onToggle={onToggle}>
                        {({ on, onToggle }) => (
                            <div className="elh">
                                <h1>
                                    {props.history.location.state?.ename ?
                                        props.history.location.state?.ename :
                                        " "}
                                </h1>
                                <div className="dmt-switch">
                                    <span>{localStorage?.getItem("ptype") === "Post" ? "Post" : "Story"} </span>
                                    <Switch1 on={on} onSwitch={onToggle} />
                                </div>
                            </div>)}
                    </Toggle>

                    {!bussid ? <div className="text-danger" style={{ color: "red" }}>
                        Please Add Business</div> : <></>}
                    {frameFlag ?
                        <div className="left-frame-main" ref={divref}
                        >


                            {localStorage.getItem("ptype") === "Story" ?

                                <BigFrame1

                                    item={fData1}
                                    data={busiData}
                                    iname={count}
                                    type={type}
                                    vdata={vdata}
                                />
                                :
                    /*             <BigFrame
                                     item={fData}
                                     data={busiData}
                                     iname={count}
                                     type={type}
                                     vdata={vdata}
                         />
                         
                                <BigSam
                                    item={fData}
                                    data={busiData}
                                    iname={count}
                                    type={type}
                                    vdata={vdata}
                                />*/<>
                                    <BigFrame
                                        item={fData}
                                        data={busiData}
                                        iname={count}
                                        type={type}
                                        vdata={vdata}
                                    />

                                </>
                            }
                        </div>
                        : " "}
                </div>

                <div className="event-right-sidebar">
                    <EventList
                        handleClick={handleClick}
                    // handleClick1={typeData}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default EventImage;

