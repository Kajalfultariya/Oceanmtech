import React, { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import StyledSpinner from "../StyledComponent";
import { Button } from "@mui/material";
import { getTempData } from "../API";

const Temp2 = (props) => {
    console.log("props data", props?.data)
    const [backImage, setBackImage] = useState(props?.single?.thumb_image);
    const [loading3, setLoading3] = useState(true);
    const [pagecount, setPagecount] = useState(2);
    const [pagedata, setPagedata] = useState([])
    const [load, setLoad] = useState(false)
    const [apiError, setApiError] = useState("")
    const [imageList, setImageList] = useState(props?.data);


    const fetchData = async (id) => {
        const response = await getTempData(id);
        if (response) {
            if (response?.status === 200) {
                setPagedata(response?.data?.data)

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


    return (
        <>
            <div className="digital-div1">
                <div>
                    <img src={backImage}
                        className="digital-img12center"
                        id='download-content' />
                    <div style={{
                        color: "white",
                        backgroundColor: "#084277",
                        height: "25px",
                        width: "300px",
                        cursor: "pointer"
                    }}
                    // onClick={() => { openPayModal() }}
                    >
                        Edit
                    </div>

                </div>
                <div>
                    <p style={{ marginBottom: "20px" }}>
                        Before & After
                    </p>
                    <div
                        style={{ width: "100%", marginLeft: "50px" }}
                    >
                        <ImageList
                            cols={4} gap={10}// className="imgelist"
                        >
                            {imageList ?
                                imageList?.length > 0 ?
                                    imageList.map((item, index) => {

                                        const iname = item?.thumb_image;
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
                                                        cursor: "pointer"
                                                    }}
                                                    onLoad={() => setLoading3(false)}
                                                    onClick={(e) => {
                                                        setBackImage(e.target.src)
                                                        //  handleClick(e.target.src, typeFlag)
                                                    }}
                                                />
                                            </ImageListItem>

                                        )
                                    }) :
                                    <>
                                    </>
                                : <StyledSpinner color="blue" size={50} />
                            }
                            {
                                pagedata ?
                                    pagedata.length > 0
                                        ?
                                        pagedata.map((item) => {
                                            const iname = item?.thumb_image;
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
                                                            setBackImage(e.target.src)
                                                        }}
                                                    />
                                                </ImageListItem>

                                            )
                                        }) :
                                        <>
                                        </>
                                    : <StyledSpinner color="blue" size={50} />
                            }
                        </ImageList>

                        {apiError ? " " : load ? "" :
                            <Button id="Event-lastbutton-icon"
                                onClick={async () => {
                                    const response = await fetchData(pagecount)
                                    console.log("21", response)
                                    if (response?.success == true)
                                        setPagedata(imageList => [...imageList, ...response?.data?.data]);
                                    else
                                        setLoad(true)
                                    setPagecount(pagecount + 1)
                                }}
                            >
                                Load More
                            </Button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Temp2