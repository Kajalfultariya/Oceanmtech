import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import { geteventpagedata, getbusipagedata, getcatpagedata, getuserLang } from "../API";
import StyledSpinner from "../StyledComponent";
import Error from "./Error";


const EventList = ({ handleClick }) => {

    const ptype = localStorage.getItem("ptype")
    const [rData, setRData] = useState([])
    const [loading3, setLoading3] = useState(true);
    const [apiError, setApiError] = useState("")
    const [imageFlag, setImageFlag] = useState(true)
    const [imageList, setImageList] = useState([]);
    const [typeFlag, setTypeFlag] = useState("Image")
    const [pagecount, setPagecount] = useState(2);
    const [videoFlag, setVideoFlag] = useState(false)
    const [load, setLoad] = useState(false)
    const [pagedata, setPagedata] = useState([])
    const [lanid, setLanid] = useState(1);


    useEffect(async () => {
        if (ptype) {
            setImageList([])
            setPagedata([])
            fetchImageData(ptype, typeFlag);
            const response = await getuserLang(JSON.parse(localStorage.getItem("id")), ptype, typeFlag)
            console.log("response of user language", response)
            setRData(response?.data)
        }
    }, [ptype]);

    const languageChange = (e) => {

        setTimeout(() => {
            fetchImageData(ptype, typeFlag, e.target.value)
            setPagedata([])
            setPagecount(2)
            setLoad(false)

        }, 50);



    }


    const [images, setImages] = React.useState("");
    const [imageId, setImageId] = useState(0)


    const fetchImageData = async (post, image, lid) => {
        const liid = lid ? lid : 1
        setLanid(liid)

        if (JSON.parse(localStorage.getItem("slidename")) === "event") {
            const response = await geteventpagedata(JSON.parse(localStorage.getItem("id")), "1", liid, post, image);
            console.log("1", response?.data)
            setImageList(response?.data?.data)
            if (response) {

                if (response?.status === 200) {
                    setImageId(response?.data?.data[0]?.id)
                    setImages(response?.data?.data[0].file)
                }
                else if (response?.status === 401) {
                    localStorage.clear();
                    window.location.href = "/"
                }
                else {
                    setApiError(response?.message ? response?.message : "Data not Found")
                }

            }

        }
        if (JSON.parse(localStorage.getItem("slidename")) === "category") {
            const response = await getcatpagedata(JSON.parse(localStorage.getItem("id")), "1", liid, post, image)

            setImageList(response?.data?.data)
            if (response) {
                if (response?.status === 200) {
                    setImageId(response?.data?.data[0]?.id)
                    setImages(response?.data?.data[0].file)
                }
                else if (response?.status === 401) {
                    localStorage.clear();
                    window.location.href = "/"
                }
                else {
                    setApiError(response?.message ? response?.message : "Data not Found")
                }

            }

        }
        if (JSON.parse(localStorage.getItem("slidename")) === "business") {
            const response = await getbusipagedata(JSON.parse(localStorage.getItem("id")), "1", liid, post, image)
            console.log("3", response?.data?.data)
            setImageList(response?.data?.data)
            if (response) {

                if (response?.status === 200) {
                    setImageId(response?.data?.data[0]?.id)
                    setImages(response?.data?.data[0].file)
                }
                else if (response?.status === 401) {
                    localStorage.clear();
                    window.location.href = "/"
                }
                else {
                    setApiError(response?.message ? response?.message : "Data not Found")
                }

            }
        }

    }

    const handleLoad = async (pt, type) => {

        // setHt(ht + "700px")

        if (JSON.parse(localStorage.getItem("slidename")) === "event") {
            const response = await geteventpagedata(JSON.parse(localStorage.getItem("id")), pagecount, lanid, pt, type)
            console.log("21", response?.data?.data)
            if (response?.success == true)
                setPagedata(imageList => [...imageList, ...response?.data?.data]);
            else
                setLoad(true)
        }
        if (JSON.parse(localStorage.getItem("slidename")) === "category") {
            const response = await getcatpagedata(JSON.parse(localStorage.getItem("id")), pagecount, lanid, pt, type)
            console.log("22", response?.data?.data)
            if (response?.success == true)
                setPagedata(imageList => [...imageList, ...response?.data?.data]);
            else
                setLoad(true)
        }
        if (JSON.parse(localStorage.getItem("slidename")) === "business") {
            const response = await getbusipagedata(JSON.parse(localStorage.getItem("id")), pagecount, lanid, pt, type)
            console.log("23", response?.data?.data)
            if (response?.success == true)
                setPagedata(imageList => [...imageList, ...response?.data?.data]);
            else
                setLoad(true)
        }
        setPagecount(pagecount + 1)
    }

    return (
        <>
            <div className="elr-content">
                <div className="elr-top">
                    <div className="ebtn-group">
                        <Button variant="outlined"
                            id="Event-right-button"
                            style={{
                                backgroundColor: imageFlag ? "rgb(1, 61, 129)" : "white",
                                color: imageFlag ? "white" : "rgb(1, 61, 129)"
                            }}
                            onClick={() => {
                                if (!imageFlag) {
                                    setApiError(" ")
                                    setLoad(false)
                                    setImageList([])
                                    setPagedata([])
                                    fetchImageData(ptype, "Image")
                                    setTypeFlag("Image")
                                    setImageFlag(true)
                                    setVideoFlag(false)
                                }
                            }}>
                            Image
                        </Button>

                        <Button variant="outlined"
                            id="Event-right-button"
                            style={{
                                backgroundColor: videoFlag ? "rgb(1, 61, 129)" : "white",
                                color: videoFlag ? "white" : "rgb(1, 61, 129)"
                            }}
                            onClick={() => {
                                if (!videoFlag) {
                                    setApiError(" ")
                                    setLoad(false)
                                    setImageList([])
                                    setPagedata([])
                                    fetchImageData(ptype, "Video")
                                    setTypeFlag("Video") 
                                    setVideoFlag(true)
                                    setImageFlag(false)
                                }
                            }}>
                            Video
                        </Button>
                    </div>

                    <select className="language-select" onChange={(e) => { languageChange(e) }} >
                        {
                            rData?.map((item) => {
                                return (
                                    <>
                                        <option value={item?.id}>
                                            {item?.name}
                                        </option>
                                    </>
                                )
                            })}
                    </select>
                </div>
                <div className="elr-gallery">
                    <ImageList
                        cols={4} gap={15} className="imgelist">
                        {
                            imageFlag ?
                                imageList ?
                                    imageList?.length > 0 ?
                                        imageList.map((item, index) => {

                                            const iname = item?.file;
                                            return (
                                                <ImageListItem
                                                    key={index}
                                                >
                                                    <div style={{ display: loading3 ? "block" : "none" }}>
                                                        <StyledSpinner size={50} />
                                                    </div>
                                                    <img
                                                         referrerPolicy="no-referrer"
                                                        src={iname}
                                                                                                              style={{
                                                            display: loading3 ? "none" : "block",
                                                            ObjectFit: "cover",
                                                        }}
                                                        onLoad={() => setLoading3(false)}
                                                        onClick={(e) => {
                                                            handleClick(e.target.src, typeFlag)
                                                        }}
                                                    />
                                                </ImageListItem>

                                            )
                                        }) :
                                        <>
                                        </>
                                    : <StyledSpinner color="blue" size={50} />
                                : " "}

                        {imageFlag ?
                            pagedata ?
                                pagedata.length > 0
                                    ?
                                    pagedata.map((item) => {
                                        const iname = item?.file;
                                        return (
                                            <ImageListItem
                                                key={iname} >
                                                <div style={{ display: loading3 ? "block" : "none" }}>
                                                    <StyledSpinner size={50} />
                                                </div>
                                                <img
                                                    //  referrerPolicy="no-referrer"
                                                    src={iname}
                                                    //srcSet={iname}
                                                    style={{ display: loading3 ? "none" : "block" }}
                                                    onLoad={() => setLoading3(false)}

                                                    alt={item.id}
                                                    loading="lazy"
                                                    onClick={(e) => {
                                                        handleClick(e.target.src, typeFlag)
                                                    }}
                                                />
                                            </ImageListItem>

                                        )
                                    }) :
                                    <>
                                    </>
                                : <StyledSpinner color="blue" size={50} /> : ""}
                        {videoFlag ?

                            imageList ?
                                imageList?.length > 0 ?
                                    imageList.map((item, index) => {

                                        const iname = item?.thumb_file;
                                        return (
                                            <ImageListItem
                                                key={index}
                                            >
                                                <div style={{ display: loading3 ? "block" : "none" }}>
                                                    <StyledSpinner size={50} />
                                                </div>
                                                <img
                                                    //    referrerPolicy="no-referrer"
                                                    src={iname}
                                                    style={{ display: loading3 ? "none" : "block" }}
                                                    onLoad={() => setLoading3(false)}
                                                    //  srcSet={iname}
                                                    alt={item.id}
                                                    loading="lazy"
                                                    onClick={(e) => {
                                                        handleClick(item?.thumb_file, typeFlag, item?.file)
                                                    }}
                                                />

                                            </ImageListItem>
                                        )
                                    }) :
                                    <StyledSpinner color="blue" size={50} />
                                : " " : ""}
                        {videoFlag ?
                            pagedata ?
                                pagedata.length > 0
                                    ?
                                    pagedata.map((item, index) => {
                                        const iname = item?.thumb_file;
                                        return (
                                            <ImageListItem
                                                key={index}
                                            >
                                                <div style={{ display: loading3 ? "block" : "none" }}>
                                                    <StyledSpinner size={50} />
                                                </div>
                                                <img
                                                    //referrerPolicy="no-referrer"
                                                    src={iname}
                                                    style={{ display: loading3 ? "none" : "block" }}
                                                    onLoad={() => setLoading3(false)}
                                                    //srcSet={iname}
                                                    alt={item.id}
                                                    loading="lazy"
                                                    onClick={(e) => {
                                                        handleClick(item?.thumb_file, typeFlag, item?.file)
                                                    }}
                                                />
                                            </ImageListItem>
                                        )
                                    }) :
                                    <>
                                    </>
                                : <StyledSpinner color="blue" size={50} /> : ""}
                    </ImageList>
                </div>
            </div>
            {
                apiError !== undefined && (
                    <Error data={apiError} />

                )
            }
            {apiError ? " " : load ? "" :
                <Button id="Event-lastbutton-icon" onClick={() => handleLoad(ptype, typeFlag)} >
                    Load More
                </Button>}
        </>
    )
}


export default EventList;