import React, { useEffect, useState } from "react";
import {
    getLanguageAppData
    , getLanguageLabelData
} from "../API"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Fab from '@material-ui/core/Fab';
import Button from '@mui/material/Button';
import StyledSpinner from "../StyledComponent";
import { styled, useTheme } from "@mui/material/styles";
import Account from "./Account"


const AppLanguage = () => {

    const theme = useTheme();
    const [lAData, setLAData] = useState([])
    const [lanId, setLanId] = useState("");
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)

    useEffect(() => {
        fetchLanguageAppData();
    }, [])

    const fetchLanguageAppData = async () => {
        const response = await getLanguageAppData();
        setLAData(response?.data)
        console.log("Language App", response?.data)
    };

    const handleSelectLanguage = async (item) => {
        setLanId(item?.id)
        localStorage.setItem("LanguageId", JSON.stringify(item?.id))
        const response = await getLanguageLabelData(item?.id);
        console.log("landuage lable response", response)
        localStorage.setItem("LanguageData", JSON.stringify(response?.data))
        //    window.location.reload();
    }

    const searchState = (e) => {
        setSearchData(true);

        if (e.target.value === null) {
            //          console.log("show all")
            setSearchData(false)
        }
        if (sName !== null) {
            const filtered = lAData.filter((state) => {
                return state?.name.toLowerCase().includes(sName.toLowerCase());
            });
            setSName(e.target.value);
            setFilterData(filtered);
        }
    };


    return (
        <div className="account-main">
            <Account />
            <div className="ac-right">

                <div className="profile-header">
                    <h1>My Language</h1>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2px",
                    marginTop: "20px"

                }}>
                    <input
                        type="text"
                        placeholder="search Language"
                        className="form-control"
                        name="sName"
                        value={sName}
                        onChange={(e) => searchState(e)}
                    />
                    <Button className="search-button">
                        <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                fill="#1A1A1A"
                                fillRule="evenodd"
                                opacity=".7">
                                <path
                                    d="M10.156 16.102a5.952 5.952 0 0 1-5.954-5.95A5.952 5.952 0 0 1 10.156 4.2a5.952 5.952 0 0 1 5.953 5.95 5.952 5.952 0 0 1-5.953 5.951zm0-1.4a4.552 4.552 0 1 0-4.553-4.55 4.552 4.552 0 0 0 4.553 4.55z" />
                                <path
                                    d="M18.005 17.007a.7.7 0 1 1-.99.99l-3.642-3.64a.7.7 0 1 1 .99-.99l3.642 3.64z" />
                            </g>
                        </svg>
                    </Button>
                </div>


                {
                    searchData === false ?

                        lAData.length > 0 ?
                            lAData?.map((item, index) => {

                                return (
                                    <>
                                        <Fab variant="extended"
                                            style={{
                                                backgroundColor: "white",
                                                width: "350px",
                                                marginTop: "10px",
                                                marginLeft: "15px",

                                            }}
                                            onClick={() => handleSelectLanguage(item)}
                                            aria-label="add">

                                            <span
                                                style={{
                                                    width: "320px",
                                                    fontSize: "15",
                                                    textAlign: "left",
                                                    // paddingLeft: "30px"
                                                    textTransform: "none"
                                                }}>
                                                {item?.name}
                                            </span>
                                            {item?.id == lanId ?

                                                <span
                                                >
                                                    <CheckCircleIcon
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            color: "blue"

                                                        }} />
                                                </span>
                                                : <></>}
                                        </Fab>
                                    </>
                                )
                            }) :
                            <>{lAData ?
                                <StyledSpinner color={theme.palette.secondary.main} size={50} />
                                : lAData == undefined ?
                                    <>
                                        {JSON.parse(localStorage.getItem("LanguageData"))?.data_found_error}
                                    </>
                                    :
                                    <></>

                            } </>
                        :
                        <>
                            {filterData?.length > 0 ? (
                                filterData?.map((item) => {
                                    return (
                                        <>
                                            <Fab variant="extended"
                                                style={{
                                                    backgroundColor: "white",
                                                    width: "350px",
                                                    marginTop: "10px",
                                                    marginLeft: "15px",

                                                }}
                                                onClick={() => handleSelectLanguage(item)}
                                                aria-label="add">

                                                <span
                                                    style={{
                                                        width: "320px",
                                                        fontSize: "15",
                                                        textAlign: "left",
                                                        // paddingLeft: "30px"
                                                        textTransform: "none"
                                                    }}>
                                                    {item?.name}
                                                </span>
                                                {item?.id == lanId ?

                                                    <span
                                                    >
                                                        <CheckCircleIcon
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                                color: "blue"

                                                            }} />
                                                    </span>
                                                    : <></>}
                                            </Fab>
                                        </>

                                    )
                                }))
                                : <></>}
                        </>
                }
            </div>
        </div>

    )
}

export default AppLanguage;