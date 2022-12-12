import React, { Fragment, useState, SyntheticEvent, useEffect, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Error from "./Error";
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import Filtericon from "../Image/filter.svg";
import SearchIcon from '@mui/icons-material/Search';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Account from "./Account"
import { getOrderData } from "../API";
import { Button } from '@mui/material';
import dateFormat from 'dateformat';
import Dialog from '@mui/material/Dialog';
import StyledSpinner from "../StyledComponent";
import DialogContent from '@mui/material/DialogContent';
import moment from "moment";

const OrderHistory = () => {

    const [viewLength, setViewLength] = useState(2)
    const [open, setOpen] = React.useState(false);
    const [detailFlag, setDetailFlag] = useState(false)
    const [detailId, setDetailId] = useState("")
    const [value, setValue] = useState('logo');
    const [apiError, setApiError] = useState("")
    const [downData, setDownData] = useState([])
    const [imgProduct, setImgProduct] = useState("")
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (SyntheticEvent, newValue) => {
        setValue(newValue);
        setApiError("")
        setViewLength(2)
        setDownData([])
        fetchData(newValue)
    };

    const fetchData = async (val) => {
        const response = await getOrderData(val);
        console.log("data", response?.data)
        if (response) {
            if (response?.status === 200) {
                setDownData(response?.data)
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
        fetchData(value)
    }, [])


    const searchState = (e) => {
        setSearchData(true);

        if (e.target.value === null) {
            
            setSearchData(false)
        }
        if (sName !== null) {
            const filtered = downData.filter((state) => {
                console.log("filtter data", downData)
                return state?.status.toString().toLowerCase().includes(sName.toLowerCase());
            });

            const newArray = downData.filter((d)=>{
                return  d.order_no.toString().search(sName)!=-1
              });
              console.log(newArray)


            setSName(e.target.value);
            setFilterData(newArray);
        }
    };
    return (
        <Fragment>
            <div className="account-main">
                <Account />
                <div className="ac-right"> 
                    <div className="order-history">
                        <Box>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="wrapped label tabs example"
                            >
                                <Tab value="logo" label="Logo" className="tab-btn"/>
                                <Tab value="card" label="DBVC Card" className="tab-btn"/>
                                <Tab value="custom-frame" label="Custom-Frame" className="tab-btn"/>
                            </Tabs>
                        </Box>

                        {
                            apiError !== undefined && (
                                <Error data={apiError} />
                            )
                        }
                        {downData ? downData?.length > 0 ?
                            <div className="history-filter">
                                <div className="history-search">
                                    <div className="fs-icon"><SearchIcon /></div>                                    
                                    <input className="input-field" type="text" placeholder="Search By Order" name="search"
                                        value={sName}
                                        onChange={(e) => searchState(e)}
                                    />
                                </div>                                
                                <div className="h-filter">
                                    <img src={Filtericon}/>
                                    {/* <FormatAlignCenterIcon /> */}
                                </div>
                            </div>
                            : "" : ""}

                        {

                            searchData === false ?
                                downData ? downData?.length > 0 ? downData.slice(0, viewLength).map((item) => {
console.log("product amount",item)
                                    return (
                                        <div>
                                            <div className="h-outer">
                                                <div className="h-header">
                                                    <h2>ORDER NO {"#" + item?.order_no}</h2>
                                                    <div className="history-right">
                                                        <h6>₹ {item?.total_amount}</h6>
                                                        <p>
                                                            {item?.status === "Success" ? <Button id='Cardtab-p2'>Success</Button> :
                                                            item?.status === "Failed" ? <Button id='Cardtab-p22'>Failed</Button> : ""}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="h-body">
                                                    <div className="t-id-data">
                                                        <label>Transaction ID</label>
                                                        <p>{item?.transaction_id}</p>
                                                    </div>
                                                    <div className="t-id-data">
                                                        <label>Purchase Date</label>
                                                        <p className='cardtab-divpp1'>
                                                            {moment(item?.created_at).format("DD/MM/YY ")}
                                                            <span style={{ marginLeft: "15px" }}>
                                                                {moment(item?.created_at).format(" hh:mm   A")}</span>
                                                            {//dateFormat(item?.created_at, "dd/mm/yyyy  mm:ss")
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="h-footer">
                                                    {detailFlag ?
                                                        item?.id === detailId ?
                                                            <div className='hf-info'>
                                                                <div className='hf-left'>
                                                                    {item?.products?.length}
                                                                    <Button onClick={() => {
                                                                        handleClickOpen()
                                                                        setTimeout(() => {
                                                                            setImgProduct(item?.products[0].image)
                                                                        }, 50);
                                                                    }}>
                                                                        View</Button>
                                                                </div>
                                                                <div className='hf-right'>
                                                                    {item?.total_amount}

                                                                </div>
                                                            </div>
                                                            : ""

                                                        : " "}

                                                    <div className='hv-button'>
                                                        <Button id="Button-icon2"
                                                            onClick={() => {
                                                                if (detailFlag)
                                                                    setDetailFlag(false)
                                                                else
                                                                    setDetailFlag(true)
                                                                setDetailId(item?.id)
                                                            }}>
                                                            View Details  {detailFlag && item?.id === detailId ?
                                                                <KeyboardDoubleArrowUpIcon />
                                                                : <KeyboardDoubleArrowDownIcon />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : " " : <StyledSpinner color="blue" size={50} />

                                :
                                filterData ? filterData?.length > 0 ? filterData.map((item) => {

                                    return (
                                        <div className="h-outer">
                                            <div className="h-header">
                                                <h2>ORDER NO {"#" + item?.order_no}</h2>
                                                <div className="history-right">
                                                    <h6>₹ {item?.total_amount}</h6>
                                                    <p>
                                                        {item?.status === "Success" ? <Button id='Cardtab-p2'>Success</Button> :
                                                        item?.status === "Failed" ? <Button id='Cardtab-p22'>Failed</Button> : ""}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-body">
                                                <div className="t-id-data">
                                                    <label>Transaction ID</label>
                                                    <p>{item?.transaction_id}</p>
                                                </div>
                                                <div className="t-id-data">
                                                    <label>Purchase Date</label>
                                                    <p className='cardtab-divpp1'>
                                                        {moment(item?.created_at).format("DD/MM/YY ")}
                                                        <span style={{ marginLeft: "15px" }}>
                                                            {moment(item?.created_at).format(" hh:mm   A")}</span>
                                                        {//dateFormat(item?.created_at, "dd/mm/yyyy  mm:ss")
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-footer">
                                                {detailFlag ?
                                                    item?.id === detailId ?
                                                        <div className='hf-info'>
                                                            <div className='hf-left'>
                                                                {item?.products?.length}
                                                                <Button onClick={() => {
                                                                    handleClickOpen()
                                                                    setTimeout(() => {
                                                                        setImgProduct(item?.products[0].image)
                                                                    }, 50);
                                                                }}>
                                                                    View</Button>
                                                            </div>
                                                            <div className='hf-right'>
                                                                {item?.products[0].amount}

                                                            </div>
                                                        </div>
                                                        : ""

                                                    : " "}

                                                <div className='hv-button'>
                                                    <Button id="Button-icon2"
                                                        onClick={() => {
                                                            if (detailFlag)
                                                                setDetailFlag(false)
                                                            else
                                                                setDetailFlag(true)
                                                            setDetailId(item?.id)
                                                        }}>
                                                        View Details  {detailFlag && item?.id === detailId ?
                                                            <KeyboardDoubleArrowUpIcon />
                                                            : <KeyboardDoubleArrowDownIcon />}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : " " : " "
                        }
                        {downData?.length < 2 || viewLength === downData?.length ? " " :

                            <div className="vm-button">
                                <Button variant="outlined" onClick={() => { setViewLength(downData?.length) }}>
                                    View more</Button>
                            </div>
                        }
                    </div>

                </div>
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <center>
                    <DialogContent>
                        <img
                            // ref={ref}
                            src={imgProduct}
                            style={{
                                height: "350px",
                                width: "300px"
                            }}
                        />
                    </DialogContent>

                </center>
            </Dialog>


        </Fragment>
    )
}

export default OrderHistory;