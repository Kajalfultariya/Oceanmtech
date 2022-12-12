import React, { Fragment } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { getPaymentData, getPlanData, postSaveTrans } from "../API";
import { useState } from "react";
import Error from "./Error";
import shortid from "shortid";
import oclogo from "../Image/oclogo.png"

const Price = () => {

    const [pData, setPData] = useState([])
    const [apiError, setApiError] = useState("")
    const [amount, setAmount] = useState(1)
    const [razorkey, setRazorkey] = useState("")


    useEffect(async () => {
        const response = await getPlanData()
        const response1 = await getPaymentData();

        if (response1) {
            if (response1?.status === 200) {
                setRazorkey(response1?.data[0].credentials.PRODUCTION_API_KEY)
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


    const openPayModal = async (item) => {

        console.log("item", item)

        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        var options = {
            key: razorkey,
            name: "Oceanmtech",
            currency: 'INR',
            amount: item?.amount*100,
            receipt: shortid.generate(),
            payment_capture: 1,
            //  subscription_id: "order_" + shortid.generate(),
            // razorpay_order_id: "order_" + response.data.order_no,
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

                    const ressave = await postSaveTrans(formData)
                    console.log("response of plan", ressave)
                } else {
                    const data = {
                        razorpayPaymentId: res.razorpay_payment_id,
                        razorpayOrderId: res.razorpay_order_id,
                        razorpaySignature: res.razorpay_signature,
                    };

                    const formData = new FormData();
                    formData.append("plan_id", item?.id);
                    formData.append("transaction_id", res.razorpay_payment_id);
                    formData.append("payment_response", JSON.stringify(data));
                    formData.append("business_id", localStorage.getItem("BusinessId"));
                    formData.append("payment_status", "Success");
                    formData.append("payment_method_id", 1);

                    const ressave = await postSaveTrans(formData)

                    console.log("response of plan", ressave)

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


        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    }


    return (
        <Fragment>
            <div className="pp-mian">
                <div className="container">
                    <h1>Pricing Plan</h1>
                    {
                        apiError !== undefined && (
                            <Error data={apiError} />
                        )
                    }

                    <div className="pp-column-main">
                        {pData ? pData?.length > 0 ? pData?.map((item, index) => {
                            console.log("plan intem", item)
                            return (
                                <div className="pp-column">
                                    <div className="pp-header">
                                        <h3>{item?.title}</h3>
                                        <div className="price-value">
                                            {item?.amount}
                                        </div>
                                    </div>
                                    <div className="pp-body">
                                        <ul dangerouslySetInnerHTML={{ __html: item?.description }} />
                                    </div>
                                    <div className="pp-footer">
                                        {item?.amount > 0 ? <Button variant="outlined" className="choose-plan-btn"
                                            onClick={() =>
                                                openPayModal(item)}
                                        > Pay</Button> :
                                            <Button variant="outlined" className="choose-plan-btn"
                                            > FREE</Button>}
                                       
                                    </div>
                                </div>
                            )
                        }) : " " : " "}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Price;

