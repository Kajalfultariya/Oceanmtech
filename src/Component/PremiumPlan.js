import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import StyledSpinner from "../StyledComponent";
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import SearchIcon from '@mui/icons-material/Search';
import Filtericon from "../Image/filter.svg";
import Account from "./Account"
import { getPlanHistory } from "../API";
import Error from "./Error";

const PremiumPlan = () => {

    const [detailFlag, setDetailFlag] = useState(false)
    const [detailId, setDetailId] = useState("")
    const [transFlag, setTransFlag] = useState(false)
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)
    const [tData, setTData] = useState([])
    const [pData, setPData] = useState([])
    const [apiError, setApiError] = useState("")
    const [viewLength, setViewLength] = useState(2)

    useEffect(async () => {
        const response = await getPlanHistory()
        console.log("response", response?.data)
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

    const searchState = (e) => {
        setSearchData(true);

        if (e.target.value === null) {
            console.log("show all")
            setSearchData(false)
        }
        if (sName !== null) {
            const filtered = pData.filter((state) => {
                console.log("filtter data", pData)
                return state?.payment_status.toLowerCase().includes(sName.toLowerCase());
            });
            setSName(e.target.value);
            setFilterData(filtered);
        }
    };

    return (
        <Fragment>
            {
                apiError !== undefined && (
                    <Error data={apiError} />
                )
            }
            <div className="account-main">
                <Account />
                <div className="ac-right">
                    <div className="plan-main">
                        {transFlag ?
                            <Fragment>
                                <div className="history-filter">
                                    <div className="history-search">
                                        <div className="fs-icon"><SearchIcon /></div>
                                        <input className="input-field" type="text" placeholder="Search" name="search"
                                            value={sName}
                                            onChange={(e) => searchState(e)} />
                                    </div>
                                    <div className="h-filter">
                                        <img src={Filtericon}/>
                                      {/*   <FormatAlignCenterIcon style={{ height: "40px", width: "30px" }} /> */}
                                    </div>
                                </div>

                                <center>
                                    
                                    <div className="plan-section" >

                                        {searchData === false ?
                                            pData ? pData?.length > 0 ? pData.slice(0, viewLength)?.map((item) => {
                                                return (
                                                    <>
                                                        {item?.plan?.amount === "Free" ? " " :
                                                            <div className='h-outer'>
                                                                <div className="h-header">
                                                                    <h2>Transaction ID  {item?.transaction_id}</h2>
                                                                    <div className="history-right">
                                                                        <h6>₹ {item?.amount}</h6>
                                                                        <p>
                                                                            {item?.payment_status === "Success" ? <Button id='Cardtab-p2'>Success</Button> :
                                                                            item?.payment_status === "Failed" ? <Button id='Cardtab-p22'>Failed</Button> : ""}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="h-body">
                                                                    <div className="t-id-data">
                                                                        <label>Purchase Date</label>
                                                                        <p>{item?.start_date}</p>
                                                                    </div>
                                                                    <div className="t-id-data">
                                                                        <label>Valid Up to:</label>
                                                                        <p>
                                                                            {item?.end_date}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className='cardtab-div2'>
                                                                    <div id="Premium-circlediv">
                                                                    </div>
                                                                </div> */}

                                                            </div>
                                                        }</>
                                                )
                                            }) : <StyledSpinner color="blue" size={50} /> : " "

                                            :
                                            filterData ? filterData?.length > 0 ? filterData?.map((item) => {
                                                return (
                                                    <div className='h-outer'>
                                                        {/* <div id="Premium-circlediv">
                                                            </div> */}
                                                        <div className="h-header">
                                                            <h2>Transaction ID  {item?.transaction_id}</h2>
                                                            <div className="history-right">
                                                                <h6>₹ {item?.amount}</h6>
                                                                <p>
                                                                    {item?.payment_status === "Success" ? <Button id='Cardtab-p2'>Success</Button> :
                                                                    item?.payment_status === "Failed" ? <Button id='Cardtab-p22'>Failed</Button> : ""}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="h-body">
                                                            <div className="t-id-data">
                                                                <label>Purchase Date</label>
                                                                <p>{item?.start_date}</p>
                                                            </div>
                                                            <div className="t-id-data">
                                                                <label>Valid Up to:</label>
                                                                <p>
                                                                    {item?.end_date}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }) : <StyledSpinner color="blue" size={50} /> : ""}

                                    </div>
                                    {tData?.length < 2 || viewLength === tData?.length ? " " :
                                        <div className="vm-button">
                                            <Button variant="outlined"
                                                onClick={() => { setViewLength(tData?.length) }}>
                                                View more</Button>
                                        </div>
                                    }
                                </center>
                            </Fragment>
                            :
                            <>
                                <div className="plan-section">
                                    {pData ? pData?.length > 0 ?
                                        pData?.map((item) => {

                                            return (
                                                <>
                                                    <div className="h-outer">
                                                        <div className="h-header no-pb">
                                                            <div className="h-header-left">
                                                                <h2>{item?.plan?.plan_name}</h2>
                                                                <h3>{item?.plan?.amount + "   "}{item?.plan.amount === "Free" ? " " : "Per Year"}</h3>
                                                            </div>
                                                            <div className="history-right">
                                                                <Button variant="contained" id="Button-icon"
                                                                    onClick={() => {
                                                                        if (detailFlag)
                                                                            setDetailFlag(false)
                                                                        else
                                                                            setDetailFlag(true)
                                                                        setDetailId(item?.id)
                                                                    }}>
                                                                    Details
                                                                    {detailFlag && item?.id === detailId ?
                                                                        <KeyboardDoubleArrowUpIcon />
                                                                        : <KeyboardDoubleArrowDownIcon />}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {detailFlag ?
                                                            <div className="h-body pp-info">
                                                                {item?.id === detailId ?
                                                                    <ul>
                                                                        {
                                                                            pData?.map((item1) => {
                                                                                const ss = "";
                                                                                return (

                                                                                    item1?.id === detailId ? <>

                                                                                        <li dangerouslySetInnerHTML={{ __html: item1?.plan.plan_description }} />

                                                                                    </> : ""

                                                                                )
                                                                            })
                                                                        } </ul>
                                                                : " "}
                                                            </div>
                                                        : " "}                                                    
                                                        
                                                    </div>
                                                </>
                                            )
                                        }) : <StyledSpinner color="blue" size={50} /> : " "
                                    }
                                    <div className="vm-button" style={{ textAlign:'center' }}>
                                        <Button variant="contained" id="Button-icon" onClick={() => {
                                            setTransFlag(true)
                                            fetchTransDetail()
                                        }}>
                                            <WorkHistoryIcon style={{ marginRight: "10px" }} />Transaction History
                                        </Button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default PremiumPlan;
