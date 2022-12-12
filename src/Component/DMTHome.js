import React from "react";
import 'react-slideshow-image/dist/styles.css'
import Error from "./Error";
import Toggle from "./Toggle";
import Switch1 from "./Switch1";
import { useHistory } from 'react-router';
import { getData } from "../API";
import { useEffect } from "react";
import { useState } from "react";
import StyledSpinner from "../StyledComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";


const DMTHome = () => {


    const history = useHistory();
    const [apiError, setApiError] = useState("")
    const [catName, setCatName] = useState([]);
    const [BusiName, setBusiName] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [sliderName, setSliderName] = useState([]);
    const [homeFlag, setHomeFlag] = useState(false)
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    const onToggle = async (state) => {
        if (state == true) {
            setHomeFlag(false)
            setBusiName([])
            setSliderName([])
            setCatName([])
            setEventData([])
            // localStorage.setItem("ptype","Post")
            fetchGetData("Post")

        }
        else {
            setHomeFlag(false)
            setBusiName([])
            setSliderName([])
            setCatName([])
            setEventData([])
            // localStorage.setItem("ptype","Story")
            fetchGetData("Story")
        }
    }

    useEffect(async () => {
        fetchGetData("Post")
    }, [])

    const handleImage = (img, name, id, nn) => {
        console.log("cat name", name)
        localStorage.setItem("id", JSON.stringify(id));
        localStorage.setItem("slidename", JSON.stringify(nn));

        history.push("/event-page", { bimg: img[0].thumb_file, ename: name })
    }

    const fetchGetData = async (type) => {
        localStorage.setItem("ptype", type)
        const response = await getData(type);
        console.log("home response", response?.data)
        if (response) {
            if (response?.status === 200) {
                setCatName(response?.data?.category);
                setEventData(response?.data?.event)
                setSliderName(response?.data?.slider)
                setBusiName(response?.data?.business_category)
                setHomeFlag(true)
            }
            else if (response?.status === 401) {
                localStorage.clear();
                // window.location.reload();
                window.location.href = "/"
            }
            else {
                setHomeFlag(true)
                setApiError(response?.message ? response?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }
    }

    return (
        <div id="Dmthome-div1">
            <div id="Dmthome-div2">
                {
                    apiError !== undefined && (
                        <Error data={apiError} />
                    )
                }
                <div className="dmt-top-filter">
                    <Toggle onToggle={onToggle}>
                        {({ on, onToggle }) => (
                            <div className="dmt-switch">
                                <span>{on ? "Post" : "Story"} </span>
                                <Switch1 on={on} onSwitch={onToggle} />
                            </div>
                        )}
                    </Toggle>
                </div>

                {/* First slider */}
                <div className="photo-gallery">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {sliderName ? sliderName?.length > 0 ? sliderName?.map((item) => {
                            return (
                                <SwiperSlide>
                                    <figure className="hero-image">
                                        <div style={{ display: loading ? "block" : "none" }}>
                                            <StyledSpinner size={50} />
                                        </div>
                                        <img src={item?.image} onLoad={() => setLoading(false)}
                                            style={{ display: loading ? "none" : "block" }} />
                                    </figure>
                                </SwiperSlide>
                            )
                        })
                            : " " : <StyledSpinner color="blue" size={50} />
                        }
                    </Swiper>
                </div>

                {homeFlag ? <></> : <StyledSpinner color="blue" size={50} />}

                {/*event swipper*/}
                {eventData?.length > 0 ?
                    <div className="photo-gallery">
                        <h2>{eventData[0]?.name}</h2>
                        <p className="dmt-p2" onClick={() => handleImage(eventData, item?.name, item?.id, "event")}>
                            {eventData ? eventData?.length > 0 ? More : "" : ""}    </p>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={6}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {eventData ? eventData?.length > 0 ? eventData?.map((item) => {

                                return (
                                    <SwiperSlide>
                                        <article style={{
                                            height: "100%",
                                            position: "relative",
                                            overflow: "hidden"
                                        }}>
                                            <div style={{ display: loading1 ? "block" : "none" }}>
                                                <StyledSpinner size={50} />
                                            </div>
                                            <img
                                                onClick={() => handleImage(eventData, item?.name, item?.id, "event")}
                                                className="dmt-img"
                                                onLoad={() => setLoading1(false)}
                                                style={{
                                                    borderBlock: "solid",
                                                    objectFit: "cover",
                                                    display: loading1 ? "none" : "block"
                                                }}
                                                src={item?.file}
                                                alt="background" />
                                            <span
                                                style={{
                                                    width: "100px",
                                                    backgroundColor: "darkblue",
                                                    color: "white",
                                                    position: "absolute",
                                                    top: "10px",
                                                    left: "5px",
                                                    right: 0,
                                                    height: "20px",
                                                    fontSize: "17px",
                                                    margin: "auto",
                                                    borderRadius: "30px"

                                                }}>
                                                <strong>
                                                    {item?.event_date}
                                                </strong>
                                            </span>

                                            <span
                                                style={{
                                                    width: "220px",
                                                    backgroundColor: "darkblue",
                                                    color: "white",
                                                    position: "absolute",
                                                    top: "200px",
                                                    left: "5px",
                                                    right: 0,
                                                    fontSize: `${20}px`,
                                                    height: "25px",
                                                    overflowX: "hidden",
                                                    margin: "auto",

                                                }}>
                                                <strong>

                                                    <div className="target1">{item?.name}</div>

                                                </strong>
                                            </span>
                                        </article>
                                    </SwiperSlide>
                                )
                            }) : " " : <StyledSpinner color="blue" size={50} />
                            }

                        </Swiper>
                    </div>
                    : ""}
                {/*business swipper*/}

                {/*business*/}
                {BusiName ? BusiName?.length > 0 ?
                    BusiName?.map((item, index) => {
                        return (
                            <>
                                <div className="photo-gallery">
                                    <div className="cat-header">
                                        <h2> {item?.name}</h2>
                                        <Link className="more-link" onClick={() => {
                                            handleImage(BusiName[index]?.home_data, item.name, item.id, "category");
                                        }}>
                                            More
                                        </Link>
                                    </div>

                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={6}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper"
                                    >
                                        {BusiName[index]?.home_data?.map((item2) => {

                                            return (
                                                <SwiperSlide>
                                                    <figure className="cat-image">
                                                        <div style={{ display: loading3 ? "block" : "none" }}>
                                                            <StyledSpinner size={50} />
                                                        </div>
                                                        <img src={item2?.thumb_file}
                                                            style={{ display: loading3 ? "none" : "block" }}
                                                            onLoad={() => setLoading3(false)}
                                                            onClick={() => {
                                                                handleImage(catName[index]?.home_data, item.name, item.id, "category");
                                                            }} />
                                                    </figure>

                                                </SwiperSlide>
                                            )
                                        })}


                                    </Swiper>

                                </div>
                            </>

                        )
                    }) : " " : <StyledSpinner color="blue" size={50} />}


                {/*category swipper*/}
                {catName ? catName?.length > 0 ?
                    catName?.map((item, index) => {
                        return (
                            <>
                                <div className="photo-gallery">
                                    <div className="cat-header">
                                        <h2> {item?.name}</h2>
                                        <Link className="more-link" onClick={() => {
                                            handleImage(catName[index]?.home_data, item.name, item.id, "category");
                                        }}>
                                            More
                                        </Link>
                                    </div>

                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={6}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper"
                                    >
                                        {catName[index]?.home_data?.map((item2) => {

                                            return (
                                                <SwiperSlide>
                                                    <figure className="cat-image">
                                                        <div style={{ display: loading3 ? "block" : "none" }}>
                                                            <StyledSpinner size={50} />
                                                        </div>
                                                        <img src={item2?.thumb_file}
                                                            style={{ display: loading3 ? "none" : "block" }}
                                                            onLoad={() => setLoading3(false)}
                                                            onClick={() => {
                                                                handleImage(catName[index]?.home_data, item.name, item.id, "category");
                                                            }} />
                                                    </figure>

                                                </SwiperSlide>
                                            )
                                        })}


                                    </Swiper>

                                </div>
                            </>

                        )
                    }) : " " : <StyledSpinner color="blue" size={50} />}



            </div>

        </div>
    )
}
export default DMTHome;

