import React, { useEffect } from "react";
import { useState } from "react";
import { getPaymentData, getLogoList } from "../API";
import StyledSpinner from "../StyledComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import oclogo from "../Image/oclogo.png"
import { Autoplay, Navigation } from "swiper";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { postCallOrder, postAddOrder } from "../API";
import Error from "./Error";
import shortid from "shortid";

const Logo = () => {

    const [dbvcData, setDbvcData] = useState([])
    const [apiError, setApiError] = useState("")
    const [page, setPage] = useState(false)
    const [frameData, setFrameData] = useState([])
    const [price, setPrice] = useState("")
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [razorkey, setRazorkey] = useState("")
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)


    useEffect(async () => {
        fetchGetData()
    }, [])


    const [index, setActiveStep] = React.useState(0);


    const fetchGetData = async () => {
        const response = await getLogoList();
        const response1 = await getPaymentData();

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
            setFilterData(filtered);
        }
    };


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
        formData.append("type", "logo");
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
                                <div>
                                    <img src={frameData[index].image}
                                        className="digital-img12center"
                                        id='download-content' />
                                    <div style={{
                                        color: "white",
                                        backgroundColor: "#084277",
                                        height: "25px",
                                        width: "300px",
                                        cursor: "pointer"
                                    }}
                                        onClick={() => { openPayModal() }}
                                    >
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
                                        {frameData[index].amount}/-</div>
                                </div>
                            </div>
                            {frameData?.length > 0 ?
                                <div className="photo-gallery">
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={6}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper1"
                                    >
                                        {frameData ? frameData?.length > 0 ? frameData?.map((item, index) => {

                                            return (
                                                <SwiperSlide>
                                                    <div style={{ display: loading3 ? "block" : "none" }}>
                                                        <StyledSpinner size={50} />
                                                    </div>
                                                    <img src={item?.image} className="dmt-img"
                                                        style={{ display: loading3 ? "none" : "block" }}
                                                        onLoad={() => setLoading3(false)}
                                                        onClick={() => {
                                                            setActiveStep(index)
                                                        }} />
                                                </SwiperSlide>
                                            )
                                        }) : " "
                                            :
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="900.000000pt" height="512.000000pt" viewBox="0 0 900.000000 512.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                    fill="#000000" stroke="none">
                                                    <path d="M4483 5109 c-174 -29 -348 -162 -433 -332 -89 -179 -77 -431 30 -596
176 -271 513 -366 800 -224 149 73 283 241 321 403 17 72 17 221 0 290 -40
165 -172 331 -321 404 -122 59 -258 78 -397 55z"/>
                                                    <path d="M3017 4435 c-94 -26 -160 -66 -243 -149 -122 -122 -164 -224 -164
-397 0 -163 49 -281 164 -394 115 -114 237 -165 396 -165 159 0 287 55 402
171 136 138 189 333 143 528 -44 185 -202 348 -394 405 -67 20 -234 20 -304 1z"/>
                                                    <path d="M5995 4144 c-61 -15 -92 -30 -127 -62 -110 -99 -116 -265 -13 -367
57 -58 117 -79 203 -73 135 10 231 113 232 248 0 97 -65 198 -150 234 -40 16
-116 27 -145 20z"/>
                                                    <path d="M2451 2959 c-153 -27 -314 -164 -375 -318 -41 -105 -39 -280 6 -383
36 -85 117 -176 212 -241 141 -95 392 -90 537 10 173 120 254 299 228 505 -22
178 -164 349 -337 409 -66 23 -196 32 -271 18z"/>
                                                    <path d="M6524 2736 c-110 -51 -177 -157 -177 -281 0 -85 23 -144 82 -208 80
-87 215 -118 325 -77 263 99 271 453 14 570 -64 29 -177 27 -244 -4z"/>
                                                    <path d="M3130 1482 c-237 -17 -420 -220 -420 -463 0 -126 49 -238 144 -327
180 -170 457 -168 633 4 87 85 126 167 139 289 21 201 -110 402 -307 475 -40
14 -139 26 -189 22z"/>
                                                    <path d="M5908 1357 c-200 -84 -284 -299 -190 -489 61 -124 162 -190 302 -196
118 -5 183 19 266 102 83 83 107 148 102 266 -5 98 -26 152 -89 224 -92 104
-265 145 -391 93z"/>
                                                    <path d="M4505 806 c-75 -19 -132 -52 -192 -112 -90 -90 -131 -215 -113 -344
46 -328 455 -464 689 -229 83 84 121 174 121 289 0 114 -38 205 -120 287 -104
104 -245 144 -385 109z"/>
                                                </g>
                                            </svg>
                                        }

                                    </Swiper>
                                </div>
                                : ""}

                            <center>
                                <div className="digital-div2">
                                    <Button id="Digital-button-icon1"
                                        onClick={() => {
                                            window.open(`https://web.whatsapp.com/send?phone=+919106902181&text=` + frameData[index].image);
                                        }} >
                                        Share
                                    </Button>
                                </div>
                            </center>
                        </>
                        :
                        dbvcData?.length > 0 ?
                            <div>
                                <div className="input-container">
                                    <i className="icon"><SearchIcon /></i>
                                    <input className="input-field" type="text" placeholder="Search Logo" name="search"
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
                                                                                console.log("item2", dbvcData[index]?.cards, dbvcData[index]?.cards?.length, index)
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
                                        :

                                        <></>
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
                                                                            console.log("item2", dbvcData[index]?.cards, dbvcData[index]?.cards?.length, index)
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
                                    }) : <Error data="No Record" /> : " "}
                            </div>
                            :
                            <StyledSpinner color="blue" size={50} />
                }
            </div>
        </>
    )
}

export default Logo;


/*


    
    const options = {

        key: razorkey,
        amount: frameData[index]?.amount * 100, //  = INR 1
        name: "Oceanmtech DMT",
        description: "some description",
        image: oclogo,
        handler: function (response) {
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: "Oceanmtech",
            contact: "9106902181",
            email: "info@oceanmtechdmt.in"
        },
        notes: {
            address: "Ambtech Multitrade Private Limited"
        },
        theme: {
            color: "#084277",
            hide_topbar: false
        }
    };

    const openPayModal = (options) => {
        // setAmount(amt)
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);



*/