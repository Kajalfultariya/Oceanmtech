import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Button } from "@mui/material";
import Account from "./Account"
import { getOrderData } from "../API";
import Error from "./Error";
import { jsPDF } from 'jspdf';
import StyledSpinner from "../StyledComponent";

const DigitalCard = () => {

    const [index, setActiveStep] = React.useState(1);
    const [collectionSize, setCollectionSize] = useState(1);
    const [downData, setDownData] = useState([])
    const [apiError, setApiError] = useState("")

    useEffect(async () => {
        fetchData()
    }, [])


    const fetchData = async () => {
        const response = await getOrderData("card");
        console.log("data", response?.data)
        if (response) {
            if (response?.status === 200) {
                setDownData(response?.data)
                setCollectionSize(response?.data?.length)
            }
            else if (response?.status === 401) {
                localStorage.clear();
                window.location.href = "/"
            }
            else {
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }
    }

    const goToNextPicture = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const goToPrePicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


   
    return (
        <Fragment>
            <div className="account-main">
                <Account />
                <div className="ac-right">
                    {
                        apiError !== undefined && (
                            <Error data={apiError} />
                        )
                    }
                    <center>
                        <div className="digital-div1">

                            <Button
                                size="small"
                                onClick={goToPrePicture}
                                disabled={index === 0}
                            >
                                < KeyboardArrowLeft id="Next-button" />
                            </Button>
                            {downData ? downData?.length > 0 ? <>
                                {index === 0 ?
                                    <div className="digital-div12left" /> :
                                    <img src={downData[index - 1].products[0].image} className="digital-img12left" />}

                                <img src={downData[index].products[0].image} className="digital-img12center" />

                                {downData?.length - 1 == index ?
                                    <div className="digital-div12right" /> :
                                    <img src={downData[index + 1].products[0].image} className="digital-img12right" />}
                            </> : <StyledSpinner color="blue" size={50} /> : " "}
                            <Button
                                size="small"
                                onClick={goToNextPicture}
                                disabled={index === collectionSize - 1}
                            >
                                <KeyboardArrowRight id="Next-button" />
                            </Button>


                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {downData?.map((item, ix) => {
                                return (
                                    <div className="digital-dots"
                                        onClick={() => {
                                            console.log("ixxx", ix)
                                            setActiveStep(ix)
                                        }}
                                        style={{ backgroundColor: index === ix ? "rgb(1, 61, 129)" : "grey" }}>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="digital-div2">
                            <Button id="Digital-button-icon1"
                                onClick={() => {

                                    var xhr = new XMLHttpRequest();
                                    xhr.open("GET", downData[index].products[0].image, true);
                                    xhr.responseType = "blob";
                                    xhr.onload = function (e) {
                                        var reader = new FileReader();
                                        reader.onload = function (event) {
                                            var res = event.target.result;
                                            const link = document.createElement("a");
                                            link.href = res;
                                            link.setAttribute("download", "image.png"); //or any other extension
                                            document.body.appendChild(link);
                                            link.click();
                                        }
                                        var file = this.response;
                                        reader.readAsDataURL(file)
                                    };
                                    xhr.send()


                                }}>Download Image</Button>
                            <Button id="Digital-button-icon1"
                             onClick={() => {
                                const doc = new jsPDF("p", "mm", "a4");
                                const width = doc.internal.pageSize.getWidth();
                                const height = doc.internal.pageSize.getHeight();
                                var img = new Image()
                                img.src =  downData[index].products[0].image
                                doc.addImage(img, "JPEG", 0, 0, width, height)
                                doc.save("downpdf.pdf");
                                
                            }}
                            >Download PDF</Button>
                            <Button id="Digital-button-icon1"
                            onClick={()=>{
                                window.open(`https://web.whatsapp.com/send?phone=+919106902181&text=`+downData[index].products[0].image);
                            }}>Share</Button>
                        </div>
                    </center>
                </div>
            </div>
        </Fragment>
    )
}

export default DigitalCard;
