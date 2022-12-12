import React, { useEffect, useState } from "react";
import { getTempData } from "../API";
import StyledSpinner from "../StyledComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { Autoplay, Navigation } from "swiper";
import Temp2 from "./Temp2";
import Error from "./Error";

const Temp = () => {
    const [apiError, setApiError] = useState("")
    const [downData, setDownData] = useState([])
    const [loading2, setLoading2] = useState(true);
    const [page, setPage] = useState(false);
    const [frameData, setFrameData] = useState([])

    const fetchData = async (id) => {
        const response = await getTempData(id);
        if (response) {
            if (response?.status === 200) {
                setDownData(response?.data?.data)
                console.log("response", response)
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

    useEffect(async () => {
        fetchData(1)
    }, [])

    return (
        <>
            {
                apiError !== undefined && (
                    <Error data={apiError} />
                )
            }

            {page ? <>
                <Temp2
                    data={downData}
                    single={frameData}
                />
            </> :

                <div className="photo-gallery">
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}>
                        <h2 style={{ marginBottom: "0px" }}>Befor & After </h2>
                        <p>{downData.length > 1 ? "More" : " "}   </p>
                    </div>

                    <Swiper
                        spaceBetween={0}
                        slidesPerView={6}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {
                            downData ? downData?.length > 0 ? downData?.map((item, index) => {

                                return (
                                    <>
                                        <SwiperSlide>
                                            <figure className="cat-image">
                                                <div style={{ display: loading2 ? "block" : "none" }}>
                                                    <StyledSpinner size={50} />
                                                </div>
                                                <img src={item?.thumb_image}
                                                    style={{ display: loading2 ? "none" : "block" }}
                                                    onLoad={() => setLoading2(false)}
                                                    onClick={() => {
                                                        ///            console.log("item2", downData[index]?.cards, downData[index]?.cards?.length, index)
                                                        setPage(true)
                                                        setFrameData(item)
                                                        //   <DBVC2 />
                                                    }} />
                                            </figure>

                                        </SwiperSlide>


                                    </>
                                )
                            }) : ""
                                : <></>
                        }

                    </Swiper>
                </div>


            }
        </>
    )
}

export default Temp;