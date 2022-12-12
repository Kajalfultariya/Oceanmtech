import React from "react";
import Error from "../Component/Error";

import { useEffect } from "react";
import { getTermData } from "../API";
import { useState } from "react";
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {

    const [terms, setTerms] = useState([])
    const [apiError, setApiError] = useState("")

    useEffect(async () => {
        const response = await getTermData("privacy")
        console.log("terms data", response?.data)
        if (response) {
            if (response?.status === 200) {
                setTerms(response?.data)
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
    }, [])
    return (
        <>
         <Header />
         
            {
                apiError !== undefined && (
                    <Error data={apiError}/>
                )
            }
            <div style={{marginTop:"80px"}}            >        
                {terms? terms?.length>0 ? 
                <>
                    <div className="tnc-content">                        
                        <div className="container">
                            <h1>{terms[0].title}</h1>
                            {/* <div>slug:{terms[0]?.slug}</div> */}
                            <div dangerouslySetInnerHTML={{ __html: terms[0].description }} />
                        </div>                    
                    </div>
                </>:"" :""}
             </div>
             <Footer />
        </>
    )
}

export default PrivacyPolicy;