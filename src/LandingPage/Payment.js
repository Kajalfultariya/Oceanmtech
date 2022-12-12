import React from 'react';
import Error from "../Component/Error";

import { useState } from 'react';
import { getLandingData } from '../API';
import { useEffect } from 'react';



const Payment = () => {

    const [payData, setPayData] = useState([])
    const [qrData, setQrData] = useState([])
    const [walletData, setWalletData] = useState([])
    const [pid, setPid] = useState("")
    const [apiError, setApiError] = useState("")


    useEffect(() => {
        getData()

    }, [])


    const getData = async () => {
        const response = await getLandingData()
        if (response) {
            if (response?.status === 200) {
                response?.data?.map((item) => {
                    if (item?.slug == "bank-details") {
                        setPayData(item?.value)
                        setPid(item?.value[0]?.bank_name)
                    }
                    if (item?.slug == "qr-code") {
                        setQrData(item?.value)

                    }
                    if (item?.slug == "wallet") {
                        setWalletData(item?.value)

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

    return (
        <>
            <section id="Payment" className="payment-section wap-hide">
                <div className="container-inner">
                    <div className="group-heading text-center">
                        <h2>PAYMENT METHOD</h2>
                    </div>
                    {
                        apiError !== undefined && (
                            <Error data={apiError}/>
                        )
                    }

                    <div className="row">
                        <div className="col-md-5">
                            <div className="qr-details">
                                <h3>OUR QR CODE</h3>
                                <img src={"https://dev.oceanmtechdmt.in/public/" + qrData?.image}
                                    height="510"
                                    width="509"
                                    alt=" "
                                //referrerPolicy="no-referrer"
                                />
                                <div className="scan-code">
                                    <p>UPI ID :{qrData?.upi_id}</p>
                                    <p>Scan my QR code to pay</p>
                                </div>
                                <div className="our-wallet">
                                    <h3>OUR WALLET</h3>
                                    <div className="wallet-number">
                                        <p>{walletData?.label}</p>
                                        <h3>+91 {walletData?.number}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>OUR BANK DETAILS</h3>
                            <div className="select-bank">
                                <span>Bank Name :</span>
                                <select onChange={(e) => {
                                    setTimeout(() => {
                                        setPid(e.target.value)
                                    }, 50);
                                }}>
                                    {payData ?
                                        payData?.length > 0 ?
                                            payData?.map((item) => {
                                                return (
                                                    <option value={item?.bank_name}>{item?.bank_name}</option>
                                                )
                                            })
                                            : " "
                                        : ""}



                                </select>
                            </div>
                            <div className="bank-info">
                                {payData ?
                                    payData?.length > 0 ?
                                        payData?.map((item) => {
                                            return (
                                                pid === " " ?
                                                    ""
                                                    :
                                                    item?.bank_name == pid ?
                                                        <>
                                                            <p>Name :  {item?.ac_name}</p>
                                                            <p>A/c No :  {item?.ac_no}</p>
                                                            <p>IFSC Code :  {item?.ifsc_code}</p>
                                                            <p>Branch Name :  {item?.branch_name}</p>
                                                        </>
                                                        : " "
                                            )
                                        })
                                        : " "
                                    : ""}


                            </div>
                        </div>
                        <div className="col-md-12 payment-tnc text-center">
                            <p>Terms and  Conditions *</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Payment;