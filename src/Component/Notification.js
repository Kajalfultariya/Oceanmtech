import React, { Fragment } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { getNotificData } from "../API";
import { useState } from "react";
import Error from "./Error";
import StyledSpinner from "../StyledComponent";
import moment from "moment";
import oclogo from "../Image/oclogo.png"
import { useHistory } from 'react-router';


const Notification = () => {

    const history = useHistory();
    const [pData, setPData] = useState([])
    const [apiError, setApiError] = useState("")

    useEffect(async () => {
        const response = await getNotificData()
        if (response) {
            if (response?.status === 200) {
                setPData(response?.data)
            }
            else if (response?.status === 401) {
                localStorage.clear();
                //  window.location.reload();
                window.location.href = "/"
            }
            else {
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }
    }, [])

    return (
        <Fragment>
            <div className="pp-mian">
                <div className="container">
                    <h1>Notification List</h1>
                    {
                        apiError !== undefined && (
                            <Error data={apiError} />
                        )
                    }


                    {pData ? pData?.length > 0 ? pData?.map((item, index) => {
                        console.log("notification intem", item)
                        return (
                            <>
                                <div style={{
                                    border: "2px solid #6D97C2",
                                    borderRadius: "10px 10px 10px 10px",
                                    marginBottom: "20px",
                                    cursor: "pointer"
                                }}
                                    onClick={() => {
                                        localStorage.setItem("id", JSON.stringify(item?.event_id));
                                        localStorage.setItem("slidename", JSON.stringify("event"));

                                        history.push("/event-page", { bimg: item?.image, ename: item?.title })
                                    }}>
                                    <div style={{ display: "flex", width: "100%" }}>
                                        <div style={{ width: "15%", textAlign: "right", margin: "10px" }}>
                                            <img src={item?.image ? item?.image : oclogo} style={{
                                                height: "150px", width: "150px",
                                                border: "2px solid #6D97C2", borderRadius: "10px 10px 10px 10px"
                                            }}>
                                            </img>
                                        </div>
                                        <div style={{ width: "80%", textAlign: "left", padding: "20px" }}>
                                            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#084277" }}>
                                                {item?.title}
                                            </div>
                                            <div style={{ fontSize: "20px", paddingTop: "10px" }}>
                                                <ul dangerouslySetInnerHTML={{ __html: item?.description }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: "95%", textAlign: "right",
                                        fontSize: "15px",
                                        color: "grey",
                                        paddingBottom: "10px"
                                    }}>
                                        {moment(item?.created_at).format("DD-MM-YY ")}
                                        <span style={{ marginLeft: "15px" }}>
                                            {moment(item?.created_at).format(" hh:mm:ss   A")}</span>
                                    </div>

                                </div>
                            </>
                        )
                    }) : <StyledSpinner size={50} /> : " "}
                </div>
            </div>
        </Fragment>
    )
}

export default Notification;

