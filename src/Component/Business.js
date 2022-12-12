import React, { Fragment } from "react";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import Error from "./Error";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";
import { useEffect } from "react";
import defaultLogo from "../Image/defaultLogo.jpg"
import { defaultBusiness, deleteBusiness, getBusinessData, getCustomframeData } from "../API";
import { useHistory } from 'react-router';
import Account from "./Account"

const Business = () => {

    const [bData, setBData] = useState([])
    const [apiError, setApiError] = useState("")
    const history = useHistory();

    useEffect(async () => {
        const response = await getBusinessData()
        
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
        }





    })


    const handleDefault = async (id) => {
        const response = await defaultBusiness(id)

        // console.log("set default", response)
    }
  

    const handleDelete = async (id) => {
        if (id == localStorage.getItem("BusinessId")) {
            localStorage.removeItem("BusinessId")
            localStorage.removeItem("BusinessName")
        }
        const tasks = bData.filter(t => t.index !== id);
        setBData(tasks)
        await deleteBusiness(id)
        window.location.reload();
    }

    return (
        <Fragment>

            <>
                <div className="account-main">
                    <Account />
                    <div className="ac-right">

                        <div className="account-header">
                            <Button variant="contained" id="Button-icon" onClick={() => {
                                window.location.href = "/add-business"
                            }}>
                                Add Business</Button>
                        </div>

                        {
                            apiError !== undefined && (
                                <Error data={apiError}/>
                            )
                        }

                        {bData ? bData?.length > 0 ? bData?.map((item, index) => {
                            return (
                                <div className="business-list" id="Business-stack">
                                    <div className="business-count">
                                        {index + 1}
                                    </div>
                                    <div className="business-avtar">
                                        <img src={item?.logo ? item?.logo : defaultLogo} id="Business-logo" />
                                    </div>

                                    <h3>{item?.name}</h3>

                                    <div className="business-action">
                                        <div className="b-action-btn">
                                            {item?.is_default === 1 ?
                                                <Button variant="contained"
                                                    id="Business-button-icon1"
                                                >
                                                    Default</Button> :
                                                <Button variant="outlined"
                                                    id="Business-button-icon"
                                                    onClick={() => { handleDefault(item?.id) }}>
                                                    Set As</Button>}
                                            <Button variant="outlined"
                                                id="Business-button-icon" onClick={() => {
                                                    history.push('/custom-frame', { data: item })
                                                }}>
                                                Custom Frame
                                            </Button>
                                        </div>

                                        <div className="b-act-icon">
                                            <Button className="action-click" onClick={() => {

                                                localStorage.setItem("BusinessData", JSON.stringify(item))
                                                window.location.href = "/update-business"

                                            }} >
                                                <BorderColorIcon id="Business-button-icon2" />
                                            </Button>
                                            <Button className="action-click" onClick={() => { handleDelete(item?.id) }}                                           >
                                                <DeleteForeverIcon id="Business-button-icon2" />
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            )
                        }) : " " : " "}
                    </div>
                </div>
            </>

        </Fragment>
    )
}

export default Business
