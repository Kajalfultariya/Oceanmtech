import React, { useEffect, useState } from "react";
import { getLandingData } from "../API";
import StyledSpinner from "../StyledComponent";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Button } from "@mui/material";
import Error from "../Component/Error";


const Video = () => {

    const [videoData, setVideoData] = useState([])
    const [apiError, setApiError] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await getLandingData()
       // console.log("video response", response)
        if (response) {
            if (response?.status === 200) {
                response?.data?.map((item) => {
                    if (item?.slug == "how-to-use") {
                        setVideoData(item?.value)
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

    const [index, setActiveStep] = React.useState(1);
    const CollectionSize = videoData?.length;

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log("index", index)
    };

    const goToPrePicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <section id="Touse" className="how-to-used wap-hide">
            <div className="group-heading">
                <h2>How To Use?</h2>
            </div>
            {
                apiError !== undefined && (
                    <Error data={apiError}/>
                )
            }

            {videoData ?
                videoData?.length > 0 ?
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center", width: "100%"
                    }} >
                        <Button
                            size="small"
                            onClick={goToPrePicture}
                            disabled={index === 0}
                        >
                            < KeyboardArrowLeft id="Next-button" />
                        </Button>
                        {index === 0 ?
                            <div className="video-frame">
                                <iframe
                                    // style={{ height: "500px", width: "300px" }}
                                    src=" "
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            :

                            <div className="video-frame">
                                <iframe
                                    // style={{ height: "600px", width: "300px", border: "1px solid #084277" }}
                                    src={videoData[index - 1]}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        }
                        <div className="video-frame">
                            <iframe
                                // style={{ height: "800px", width: "600px", border: "1px solid #084277" }}
                                src={videoData[index]}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {videoData?.length - 1 === index ?

                            <div className="video-frame">
                                <iframe
                                    // style={{ height: "500px", width: "300px" }}
                                    src=" "
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            :
                            <div className="video-frame">
                                <iframe
                                    // style={{ height: "600px", width: "300px", border: "1px solid #084277" }}
                                    src={videoData[index + 1]}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            </div>
                        }
                        <Button
                            size="small"
                            onClick={goToNextPicture}
                            disabled={index === CollectionSize - 1}
                        >
                            <KeyboardArrowRight id="Next-button" />
                        </Button>




                    </div>
                    :
                    <StyledSpinner color="blue" size={50} /> : ""}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                {videoData?.map((item, ix) => {
                    return (
                        <div className="digital-dots"
                            onClick={() => {
                                console.log("ixxx", ix)
                                setActiveStep(ix)
                            }}
                            style={{ backgroundColor: index === ix ? "rgb(1, 61, 129)" : "grey", cursor: "pointer" }}>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Video;