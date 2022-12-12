import React, { useState, useRef, useEffect } from "react";
import oclogo from "../Image/logo-blue.svg"
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import { getBusinessData, getSingleBusinessData } from "../API";
import MenuItems from "./MenuItems";
import { menuItems } from "../menuItems"
import Link from '@mui/material/Link';


const Header = ({ handleClick }) => {
    const history = useHistory();
    const [bData, setBData] = useState([])
    const [apiError, setApiError] = useState("")
    const [busiFlag, setBusiFlag] = useState(true)

    useEffect(async () => {
        const response = await getBusinessData()
        console.log("busi data", response)
        if (response) {
            if (response?.status === 200) {

                setBData(response?.data)
                if (JSON.parse(localStorage.getItem("BusiFlag"))) {

                    localStorage.setItem("BusinessId", response?.data[0]?.id)
                    localStorage.setItem("BusinessName", response?.data[0]?.name)
                }
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
    }, [])

    return (
        <>
            <header className="inner-header">
                <div className='container-main'>
                    <div className="header-inner">
                        <div className="header-temp">
                            <a href="#" className="brand-name">
                                <img src={oclogo} height="70" width="75" onClick={() => { history.push("/") }} />
                            </a>
                            <Button variant="outlined" id="Button-lefticon">
                                <div>
                                    Your Business
                                    <br />
                                    <strong>
                                        {bData ? bData.length > 0 ?
                                            <select className="header-select" style={{ fontSize: "0.9rem" }}
                                                onChange={async (e) => {
                                                    localStorage.setItem("BusiFlag", false)
                                                    localStorage.setItem("BusinessId", e.target.value)
                                                    const res = await getSingleBusinessData(e.target.value)
                                                    localStorage.setItem("BusinessName", res.data.name)
                                                    window.location.reload();

                                                }}>

                                                <option> {localStorage.getItem("BusinessName")} </option>
                                                {bData ? bData?.length > 0 ? bData?.map((item, index) => {
                                                    return (
                                                        item?.id == localStorage.getItem("BusinessId") ?
                                                            "" : <option value={item?.id}>
                                                                {item?.name ? item?.name : item?.frame_type_name}
                                                                </option>
                                                    )
                                                }) : " " : " "}
                                            </select>
                                            : "" : ""}
                                    </strong>
                                </div>
                            </Button>
                        </div>

                        <div className="header-right">
                            <nav>
                                <ul className="menus" > {
                                    menuItems.map((menu, index) => {
                                        const depthLevel = 0;
                                        return <MenuItems items={
                                            menu
                                        }
                                            key={
                                                index
                                            }
                                            depthLevel={
                                                depthLevel
                                            }
                                        />;
                                    })
                                }
                                </ul>
                            </nav>

                            <Link className="logof-btn"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/home"
                                }} > Sign Out</Link>

                        </div>

                    </div>
                </div>
            </header>
         
        </>
    )
}

export default Header;