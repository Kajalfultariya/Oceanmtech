import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postLogin, postOtp, getLanguageLabelData } from "../API";


const UseSignIn = (props) => {
    // react router
    const history = useHistory();
    const [number, setNumber] = React.useState();

    const [verifyError, setVerifyError] = React.useState("");
    //   verfication useState
    const [code1, setCode1] = React.useState();
    const [code2, setCode2] = React.useState();
    const [code3, setCode3] = React.useState();
    const [code4, setCode4] = React.useState();
    const [code5, setCode5] = React.useState();
    const [code6, setCode6] = React.useState();
    const [flag, setFlag] = useState(false)
    const [apiError, setApiError] = useState("")
    const [apiError1, setApiError1] = useState("")

    const HandleSendOtp = async (number) => {

        const formdata = new FormData();
        formdata.append("country_code", "91")
        formdata.append("mobile_no", number)

        const response = await postLogin(formdata)
        if (response) {
            if (response?.status === 200) {
                console.log("response login", response)
                localStorage.setItem("user_status", response?.data?.is_new)
                localStorage.setItem("access_token", response?.data?.token)
                localStorage.setItem("MobileNumber", number);
            }
            else {
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }

    };

    //   handle verify
    const handleVerify = async () => {
        const otpCode = code1 + code2 + code3 + code4 + code5 + code6;

        const formdata = new FormData();
        formdata.append("otp", otpCode)
        formdata.append("token", localStorage.getItem("access_token"))

        const response = await postOtp(formdata)
        console.log("otp response", response, otpCode)
        if (response) {
            if (response?.status === 200) {
                setFlag(true)
                localStorage.setItem("BusiFlag", true)
                /*fetch(`https://dev.oceanmtechdmt.in/api/web/v1/labels/get/?language_id=1`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data) {
                        console.log("language lable data", data)
                      }
                      if (data.error === true) {
                        alert(data.message);
                      }
                    });
               */
                const response1 = await getLanguageLabelData(1);
                if (response1) {
                    //console.log("lable data",response1?.data)
                    localStorage.setItem("LanguageData", JSON.stringify(response1?.data))
                }

                localStorage.setItem("AuthToken", response?.data?.token)
                var today = new Date()
                localStorage.setItem("login_time", today.getHours() + today.getMinutes());
                window.location.href = "/";
            }
            else {
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }
    };


    return {
        flag,
        setFlag,
        number,
        setNumber,
        apiError,
        setApiError,
        apiError1,
        setApiError1,
        verifyError,
        setVerifyError,
        HandleSendOtp,
        handleVerify,
        code1,
        setCode1,
        code2,
        setCode2,
        code3,
        setCode3,
        code4,
        setCode4,
        code5,
        setCode5,
        code6,
        setCode6
    };
};

export default UseSignIn;
