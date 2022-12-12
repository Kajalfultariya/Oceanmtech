import React, { useState, useEffect } from 'react';
import location from "../Image/location.svg"
import mail from "../Image/email.svg"
import call from "../Image/phone-contact.svg"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Error from "../Component/Error";

import { getLandingData, postSaveMsgData } from '../API';

const Contact = () => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [mno, setMno] = useState("")
    const [msg, setMsg] = useState("")
    const [blankmsg, setBlankMsg] = useState("")
    const [errorMno1, setErrorMno1] = React.useState("");
    const [errorMno2, setErrorMno2] = React.useState("");
    const [apiError, setApiError] = useState("")
    const [conData, setConData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await getLandingData()
        if (response) {
            if (response?.status === 200) {
                response?.data?.map((item) => {
                    if (item?.slug == "contact-us") {
                        setConData(item?.value)
                    }
                })
            }
            else {
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }
    }



    const saveData = async () => {

        if (fname && lname && email && mno && msg) {
            const formdata = new FormData();
            formdata.append("title", "test")
            formdata.append("first_name", fname)
            formdata.append("last_name", lname)
            formdata.append("email", email)
            formdata.append("mobile_no", mno)
            formdata.append("note", msg)
            const response = await postSaveMsgData(formdata)
            console.log("response save data", response)
            if (response) {
                if (response?.status === 200) {
                    setFname("")
                    setLname("")
                    setEmail("")
                    setMno("")
                    setMsg("")
                }
                else {
                    setBlankMsg(response?.message ? response?.message : " Data are not inserted Properly")
                }
            }
            else {
                setBlankMsg("Some Internal Server Error")
            }

        }
        else {
            setBlankMsg("Please filled detail")
        }
    }

    return (
        <section id="Contact" className="contact-main wap-hide">
            <div className="container-inner">
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <div className="contact-left">
                            <h3>CONTACT US</h3>
                            {
                                apiError !== undefined && (
                                    <Error data={apiError}/>
                                )
                            }

                            <div className="ca-main">
                                <figure><img src={location}

                                    height="90" width="90" /></figure>
                                <p>{conData?.address}</p>
                            </div>
                            <div className="ca-main">
                                <figure><img src={mail} height="90" width="90" /></figure>
                                <p>{conData?.email}</p>
                            </div>
                            <div className="ca-main">
                                <figure><img src={call} height="90" width="90" /></figure>
                                <p>+91 {conData?.mobile}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="contact-right">
                            <h4>Send a Message</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField id="standard-basic"
                                        label="First Name"
                                        variant="standard"
                                        value={fname}
                                        onChange={(e) => {
                                            setFname(e.target.value)
                                            setBlankMsg("")
                                        }} />
                                </div>
                                <div className="col-md-6">
                                    <TextField id="standard-basic"
                                        label="Last Name"
                                        variant="standard"
                                        value={lname}
                                        onChange={(e) => {
                                            setLname(e.target.value)
                                            setBlankMsg("")
                                        }} />
                                </div>
                                <div className="col-md-6">
                                    <TextField id="standard-basic"
                                        label="Email Address"
                                        variant="standard"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setBlankMsg("")
                                        }} />

                                </div>
                                <div className="col-md-6">
                                    <TextField id="standard-basic"
                                        label="Mobile Number"
                                        variant="standard"
                                        value={mno}
                                        onChange={(e) => {
                                            setBlankMsg("")
                                            const reg = /^[0-9\b]+$/
                                            let preval = e.target.value
                                            if (e.target.value === '' || reg.test(e.target.value)) {
                                                if (preval?.length > 10) {
                                                    setErrorMno1("Only ten digits allow")
                                                }
                                                else {
                                                    setMno(e.target.value)
                                                    setErrorMno1("")
                                                    setErrorMno2("")
                                                }
                                            }
                                            else {
                                                setErrorMno2("Please Enter Only Number")
                                            }
                                        }}
                                    />
                                    {
                                        errorMno1 !== undefined && (

                                            <div className="text-danger" style={{ color: "red" }}>{errorMno1}</div>
                                        )
                                    }
                                    {
                                        errorMno2 !== undefined && (

                                            <div className="text-danger" style={{ color: "red" }}>{errorMno2}</div>
                                        )
                                    }
                                </div>

                                <div className="col-md-12">
                                    <TextField id="standard-basic"
                                        label="Write your message here...."
                                        variant="standard"
                                        multiline
                                        rows={4}
                                        value={msg}
                                        onChange={(e) => {
                                            setMsg(e.target.value)
                                            setBlankMsg("")
                                        }} />
                                </div>
                                {
                                    blankmsg !== undefined && (

                                        <div className="text-danger" style={{ color: "red" }}>{blankmsg}</div>
                                    )
                                }
                                <div className="col-md-12">
                                    <Button variant='contained'
                                        onClick={saveData}>SEND</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Contact;