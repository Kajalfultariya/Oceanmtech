import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getDbvcList, getPaymentData } from "../API";
import StyledSpinner from "../StyledComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import oclogo from "../Image/oclogo.png"
import { Autoplay, Navigation } from "swiper";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Button } from "@mui/material";
import { jsPDF } from 'jspdf';
import { postCallOrder, postAddOrder, getOrderData } from "../API";
import Error from "./Error";
import shortid from "shortid";
import SearchIcon from '@mui/icons-material/Search';

const DBVC = () => {

    const [dbvcData, setDbvcData] = useState([])
    const [apiError, setApiError] = useState("")
    const [page, setPage] = useState(false)
    const [frameData, setFrameData] = useState([])
    const [razorkey, setRazorkey] = useState("")
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)

    const imgRef = useRef();

    useEffect(async () => {
        fetchGetData()
    }, [])


    const [loading2, setLoading2] = useState(true);
    const [addOrderData, setAddOrderData] = useState([]);

    const [index, setActiveStep] = React.useState(1);
    const CollectionSize = frameData?.length;

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const goToPrePicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const fetchGetData = async () => {
        const response = await getDbvcList();
        const response1 = await getPaymentData();
        console.log("payment response", response1?.data)
        if (response1) {
            if (response1?.status === 200) {
                setRazorkey(response1?.data[0].credentials.SANDBOX_API_KEY)
            }
            else if (response1?.status === 401) {
                localStorage.clear();
                //  window.location.reload();
                window.location.href = "/"
            }
            else {
                setApiError(response1?.message ? response1?.message : "Data not Found")
            }
        }
        else {
            setApiError("Some Internal Server Error")
        }



        if (response) {
            if (response?.status === 200) {
                console.log("responseData", response?.data)
                setDbvcData(response?.data)
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
    }


    const searchState = (e) => {
        setSearchData(true);

        if (e.target.value === null) {

            setSearchData(false)
        }
        if (sName !== null) {

            const filtered = dbvcData.filter((state, id) => {
                return state.name.toLowerCase().includes(sName.toLowerCase());
            });

            setSName(e.target.value);
            console.log("filterd", filtered)
            setFilterData(filtered);
        }
    };


    const [downFlag, setDownFlag] = useState(false)

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };


    const openPayModal = async () => {

        const formData = new FormData();
        formData.append("type", "card");
        formData.append("total_amount", frameData[index].amount);
        formData.append("products", JSON.stringify([{ product_id: frameData[index].id, amount: frameData[index].amount }]));


        const response = await postAddOrder(formData)

        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        var options = {
            key: razorkey,
            name: "Oceanmtech",
            currency: 'INR',
            amount: 100,
            receipt: shortid.generate(),
            payment_capture: 1,
            //  subscription_id: "order_" + shortid.generate(),
            razorpay_order_id: "order_" + response.data.order_no,
            //     order_id: "order_"+response.data.order_no,
            description: "Thankyou",
            image: oclogo,
            handler: async function (res) {
                console.log("get response", res)
                console.log("payment_id", res.razorpay_payment_id);
                // console.log("order_no", response.data.order_no)
                //console.log("signature", response.razorpay_signature)

                if (typeof res.razorpay_payment_id == 'undefined' || res.razorpay_payment_id < 1) {
                    const data = {
                        razorpayPaymentId: res.razorpay_payment_id,
                        razorpayOrderId: res.razorpay_order_id,
                        razorpaySignature: res.razorpay_signature,
                    };

                    const formData = new FormData();
                    formData.append("order_id", response?.data?.id);
                    formData.append("transaction_id", res.razorpay_payment_id);
                    formData.append("payment_response", JSON.stringify(data));
                    formData.append("payment_status", "Failed");
                    formData.append("payment_method_id", 1);

                    const ressave = await postCallOrder(formData)
                    console.log("response", ressave)
                } else {
                    const data = {
                        razorpayPaymentId: res.razorpay_payment_id,
                        razorpayOrderId: res.razorpay_order_id,
                        razorpaySignature: res.razorpay_signature,
                    };

                    const formData = new FormData();
                    formData.append("order_id", response?.data?.id);
                    formData.append("transaction_id", res.razorpay_payment_id);
                    formData.append("payment_response", JSON.stringify(data));
                    formData.append("payment_status", "Success");
                    formData.append("payment_method_id", 1);

                    const ressave = await postCallOrder(formData)
                    setDownFlag(true)
                    console.log("response", ressave)

                }


            },
            prefill: {
                name: "Oceanmtech",
                contact: "9106902181",
                email: "info@oceanmtechdmt.in"
            },
            theme: {
                color: "#084277",
            },
        };

        if (response) {

            /* var instance = new Razorpay({ key_id: 'rzp_live_0dTXIk7flnj3lF', key_secret: 'JRVOQbTRQOOnsSpWUerOBM9B' })
             try {
                 const ss = await instance.orders.create({
                     amount: 1,
                     currency: "INR",
                     receipt: shortid.generate(),
                     payment_capture: 1,
                     notes: {
                         key1: "value3",
                         key2: "value2"
                     }
                 })
                 console.log("response fgdfgdfg", ss)
             }
             catch (error) {
                 console.log("error", error)
             }*/
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        }
    }



    return (
        <>
            <div className="custom-logo">
                {
                    apiError !== undefined && (
                        <Error data={apiError} />
                    )
                }

                {
                    page ?

                        <>
                            <div className="digital-div1">

                                {frameData?.length === 1 ? " " :
                                    <Button
                                        size="small"
                                        onClick={goToPrePicture}
                                        disabled={index === 0}
                                    >
                                        < KeyboardArrowLeft id="Next-button" />
                                    </Button>
                                }
                                {index === 0 ?
                                    <div className="digital-div12left" /> :
                                    <div>
                                        <img src={frameData[index - 1].image} className="digital-img12left" />
                                        <div style={{
                                            color: "white",
                                            backgroundColor: "#084277",
                                            height: "25px",
                                            width: "200px"
                                        }}
                                            onClick={() => { openPayModal() }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="15.000000pt" height="9.000000pt" viewBox="0 0 1200.000000 1765.000000"
                                                preserveAspectRatio="xMidYMid meet">
                                                <metadata>
                                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                                </metadata>
                                                <g transform="translate(0.000000,1765.000000) scale(0.100000,-0.100000)"
                                                    fill="white" stroke="bold">
                                                    <path d="M528 16778 c-287 -441 -524 -807 -526 -814 -2 -10 280 -13 1330 -17
                                                                          1316 -4 1458 -8 1863 -42 1554 -133 2449 -609 2937 -1561 l71 -139 -2574 -3
                                                                         -2574 -3 -525 -806 c-289 -443 -526 -812 -528 -820 -3 -11 537 -13 3209 -13
                                                                          l3212 0 -7 -142 c-32 -690 -332 -1333 -857 -1843 -572 -555 -1370 -906 -2374
                                                                         -1044 -384 -53 -400 -54 -1547 -58 l-1078 -4 0 -783 0 -783 3147 -3952 3146
                                                                         -3951 1455 0 c1162 0 1452 3 1445 13 -6 6 -1485 1848 -3287 4092 l-3277 4080
                                                                          108 7 c514 33 1070 127 1561 264 902 251 1693 656 2352 1203 151 125 492 466
                                                                          612 611 518 628 839 1319 973 2090 14 85 28 165 31 178 l4 22 1023 0 1022 0
                                                                          525 806 c289 443 526 812 528 820 3 12 -224 14 -1582 14 -1501 0 -1585 1
                                                                         -1590 18 -2 9 -8 42 -11 72 -4 30 -18 109 -31 174 -100 497 -338 1005 -658
                                                                          1404 l-66 82 1443 0 1442 0 528 809 c290 445 527 812 527 815 0 3 -2448 6
                                                                          -5439 6 l-5439 0 -524 -802z"/>
                                                </g>
                                            </svg>
                                            {frameData[index - 1].amount}/-</div></div>}

                                {frameData?.length === 1 ? "" :
                                    <div>
                                        <img
                                            ref={imgRef}
                                            src={frameData[index].image}
                                            className="digital-img12center"
                                            id='download-content' />
                                        <div style={{
                                            color: "white",
                                            backgroundColor: "#084277",
                                            height: "25px",
                                            width: "300px",
                                            cursor: "pointer"
                                        }}
                                            onClick={() => { openPayModal() }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="15.000000pt" height="9.000000pt" viewBox="0 0 1200.000000 1765.000000"
                                                preserveAspectRatio="xMidYMid meet">
                                                <metadata>
                                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                                </metadata>
                                                <g transform="translate(0.000000,1765.000000) scale(0.100000,-0.100000)"
                                                    fill="white" stroke="bold">
                                                    <path d="M528 16778 c-287 -441 -524 -807 -526 -814 -2 -10 280 -13 1330 -17
                                                                          1316 -4 1458 -8 1863 -42 1554 -133 2449 -609 2937 -1561 l71 -139 -2574 -3
                                                                         -2574 -3 -525 -806 c-289 -443 -526 -812 -528 -820 -3 -11 537 -13 3209 -13
                                                                          l3212 0 -7 -142 c-32 -690 -332 -1333 -857 -1843 -572 -555 -1370 -906 -2374
                                                                         -1044 -384 -53 -400 -54 -1547 -58 l-1078 -4 0 -783 0 -783 3147 -3952 3146
                                                                         -3951 1455 0 c1162 0 1452 3 1445 13 -6 6 -1485 1848 -3287 4092 l-3277 4080
                                                                          108 7 c514 33 1070 127 1561 264 902 251 1693 656 2352 1203 151 125 492 466
                                                                          612 611 518 628 839 1319 973 2090 14 85 28 165 31 178 l4 22 1023 0 1022 0
                                                                          525 806 c289 443 526 812 528 820 3 12 -224 14 -1582 14 -1501 0 -1585 1
                                                                         -1590 18 -2 9 -8 42 -11 72 -4 30 -18 109 -31 174 -100 497 -338 1005 -658
                                                                          1404 l-66 82 1443 0 1442 0 528 809 c290 445 527 812 527 815 0 3 -2448 6
                                                                          -5439 6 l-5439 0 -524 -802z"/>
                                                </g>
                                            </svg>
                                            {frameData[index].amount}/-</div></div>}


                                {frameData?.length - 1 === index ?
                                    <div className="digital-div12right" /> :
                                    frameData?.length === 1 ? " " :
                                        <div>
                                            <img src={frameData[index + 1].image}
                                                className="digital-img12right" />
                                            <div style={{
                                                color: "white",
                                                backgroundColor: "#084277",
                                                height: "25px",
                                                width: "200px",
                                                marginLeft: "20px"
                                            }}
                                                onClick={() => { openPayModal() }}>
                                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                    width="15.000000pt" height="9.000000pt" viewBox="0 0 1200.000000 1765.000000"
                                                    preserveAspectRatio="xMidYMid meet">
                                                    <metadata>
                                                        Created by potrace 1.16, written by Peter Selinger 2001-2019
                                                    </metadata>
                                                    <g transform="translate(0.000000,1765.000000) scale(0.100000,-0.100000)"
                                                        fill="white" stroke="bold">
                                                        <path d="M528 16778 c-287 -441 -524 -807 -526 -814 -2 -10 280 -13 1330 -17
                                                                          1316 -4 1458 -8 1863 -42 1554 -133 2449 -609 2937 -1561 l71 -139 -2574 -3
                                                                         -2574 -3 -525 -806 c-289 -443 -526 -812 -528 -820 -3 -11 537 -13 3209 -13
                                                                          l3212 0 -7 -142 c-32 -690 -332 -1333 -857 -1843 -572 -555 -1370 -906 -2374
                                                                         -1044 -384 -53 -400 -54 -1547 -58 l-1078 -4 0 -783 0 -783 3147 -3952 3146
                                                                         -3951 1455 0 c1162 0 1452 3 1445 13 -6 6 -1485 1848 -3287 4092 l-3277 4080
                                                                          108 7 c514 33 1070 127 1561 264 902 251 1693 656 2352 1203 151 125 492 466
                                                                          612 611 518 628 839 1319 973 2090 14 85 28 165 31 178 l4 22 1023 0 1022 0
                                                                          525 806 c289 443 526 812 528 820 3 12 -224 14 -1582 14 -1501 0 -1585 1
                                                                         -1590 18 -2 9 -8 42 -11 72 -4 30 -18 109 -31 174 -100 497 -338 1005 -658
                                                                          1404 l-66 82 1443 0 1442 0 528 809 c290 445 527 812 527 815 0 3 -2448 6
                                                                          -5439 6 l-5439 0 -524 -802z"/>
                                                    </g>
                                                </svg>{frameData[index + 1].amount}/-</div></div>}
                                {frameData?.length === 1 ? " " :
                                    <Button
                                        size="small"
                                        onClick={goToNextPicture}
                                        disabled={index === CollectionSize - 1}
                                    >
                                        <KeyboardArrowRight id="Next-button" />
                                    </Button>
                                }
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {frameData?.map((item, ix) => {
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
                            {downFlag ?
                                <center>
                                    <div className="digital-div2">
                                        <Button id="Digital-button-icon1"
                                            onClick={() => {
                                                window.open(`https://web.whatsapp.com/send?phone=+919106902181&text=` + frameData[index].image);
                                            }}>
                                            Share
                                        </Button>
                                        <Button id="Digital-button-icon1" onClick={() => {
                                            const doc = new jsPDF("p", "mm", "a4");
                                            const width = doc.internal.pageSize.getWidth();
                                            const height = doc.internal.pageSize.getHeight();
                                            var img = new Image()
                                            img.src = frameData[index].image
                                            doc.addImage(img, "JPEG", 0, 0, width, height)
                                            doc.save("downpdf.pdf");
                                            setPage(false)
                                        }}>
                                            Download PDF
                                        </Button>
                                        <Button
                                            id="Digital-button-icon1"
                                            onClick={() => {

                                                var xhr = new XMLHttpRequest();
                                                xhr.open("GET", frameData[index].image, true);
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


                                            }}>
                                            Download Image
                                        </Button>
                                    </div>
                                </center> : " "}
                        </>
                        :
                        dbvcData?.length > 0 ?
                            <div>
                                <div className="input-container">
                                    <i className="icon"><SearchIcon /></i>
                                    <input className="input-field"
                                        type="text"
                                        placeholder="Search Digital Business Card"
                                        name="search"
                                        value={sName}
                                        onChange={(e) => searchState(e)}
                                    />

                                </div>
                                {searchData === false ?
                                    dbvcData ? dbvcData?.length > 0 ? dbvcData?.map((item, index) => {

                                        return (
                                            <>
                                                <div className="photo-gallery">
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        marginBottom: "20px"
                                                    }}>
                                                        <h2 style={{ marginBottom: "0px" }}>{item?.name} </h2>
                                                        <p>{dbvcData[index]?.cards?.length > 1 ? "More" : " "}   </p>
                                                    </div>

                                                    <Swiper
                                                        spaceBetween={0}
                                                        slidesPerView={6}
                                                        navigation={true}
                                                        modules={[Navigation]}
                                                        className="mySwiper"
                                                    >
                                                        {dbvcData[index]?.cards?.map((item2) => {

                                                            return (
                                                                <SwiperSlide>
                                                                    <figure className="cat-image">
                                                                        <div style={{ display: loading2 ? "block" : "none" }}>
                                                                            <StyledSpinner size={50} />
                                                                        </div>
                                                                        <img src={item2?.image}
                                                                            style={{ display: loading2 ? "none" : "block" }}
                                                                            onLoad={() => setLoading2(false)}
                                                                            onClick={() => {
                                                                                console.log("item2", item2)
                                                                                setPage(true)
                                                                                setFrameData(dbvcData[index]?.cards)
                                                                                //   <DBVC2 />
                                                                            }} />
                                                                    </figure>

                                                                </SwiperSlide>
                                                            )
                                                        })}


                                                    </Swiper>
                                                </div>

                                            </>
                                        )
                                    }) : ""
                                        : <StyledSpinner color="blue" size={50} />
                                    :
                                    filterData ? filterData?.length > 0 ? filterData.map((item, index) => {

                                        return (<>
                                            <div className="photo-gallery">
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "20px"
                                                }}>
                                                    <h2 style={{ marginBottom: "0px" }}>{item?.name} </h2>
                                                    <p>{filterData[index]?.cards?.length > 1 ? "More" : " "}   </p>
                                                </div>

                                                <Swiper
                                                    spaceBetween={0}
                                                    slidesPerView={6}
                                                    navigation={true}
                                                    modules={[Navigation]}
                                                    className="mySwiper"
                                                >
                                                    {filterData[index]?.cards?.map((item2) => {

                                                        return (
                                                            <SwiperSlide>
                                                                <figure className="cat-image">
                                                                    <div style={{ display: loading2 ? "block" : "none" }}>
                                                                        <StyledSpinner size={50} />
                                                                    </div>
                                                                    <img src={item2?.image}
                                                                        style={{ display: loading2 ? "none" : "block" }}
                                                                        onLoad={() => setLoading2(false)}
                                                                        onClick={() => {
                                                                            console.log("item2", item2)
                                                                            setPage(true)
                                                                            setFrameData(dbvcData[index]?.cards)
                                                                            //   <DBVC2 />
                                                                        }} />
                                                                </figure>

                                                            </SwiperSlide>
                                                        )
                                                    })}


                                                </Swiper>
                                            </div>
                                        </>)
                                    }) : <Error data="No Record" /> : " "}
                            </div>
                            : <StyledSpinner color="blue" size={50} />}

            </div>
        </>
    )
}

export default DBVC;