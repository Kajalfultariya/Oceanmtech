import React, { Fragment, useState, SyntheticEvent, useEffect, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Error from "./Error";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import Account from "./Account"
import { getDownloadPostList } from "../API";
import StyledSpinner from "../StyledComponent";

const Post = () => {


    const ref = useRef();
    const [value, setValue] = useState('post');
    const [apiError, setApiError] = useState("")
    const [downData, setDownData] = useState([])
    const [loading, setLoading] = useState(true);
    const handleChange = (SyntheticEvent, newValue) => {
        setValue(newValue);
        setApiError("")
        console.log("type value", newValue)
        setDownData([])
        fetchData(newValue)
    };

    const fetchData = async (val) => {
        const response = await getDownloadPostList(val);
        if (response) {
            if (response?.status === 200) {
                setDownData(response?.data?.data)
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

    return (
        <Fragment>
            <div className="account-main">
                <Account />
                <div className="ac-right">

                    <div>
                        <Box>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="wrapped label tabs example"
                            >
                                <Tab value="post" label="My Design" id="Post-right" />
                                <Tab value="cpost" label="My Custom Design" id="Post-right" />
                            </Tabs>
                        </Box>

                        {
                            apiError !== undefined && (
                                <Error data={apiError} />
                            )
                        }
                        <div className="post-tab-design" >
                            {downData ? downData?.length > 0 ? downData.map((item) => {
                                //console.log("download",item)
                                return (
                                    <div className="post-grid">

                                        <div style={{ display: loading ? "block" : "none" }}>
                                            <StyledSpinner size={50} />
                                        </div>
                                        <img src={item.data_file} ref={ref} onLoad={() => setLoading(false)}
                                            style={{ display: loading ? "none" : "block" }} />

                                        <div>
                                            <ShareIcon className="ds-icon"
                                                onClick={() => {
                                                    window.open(`https://web.whatsapp.com/send?phone=+919106902181&text=` + item.data_file);
                                                }} />

                                            <DownloadIcon className="ds-icon"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    var xhr = new XMLHttpRequest();
                                                    xhr.open("GET", item.data_file, true);
                                                    xhr.responseType = "blob";
                                                    xhr.onload = function (e) {

                                                        var reader = new FileReader();
                                                        reader.onload = function (event) {
                                                            var res = event.target.result;
                                                            const img = new Image();
                                                            img.crossOrigin = 'anonymous';
                                                            img.src = res;
                                                            img.onload = () => {
                                                                // create Canvas
                                                                const canvas = document.createElement('canvas');
                                                                const ctx = canvas.getContext('2d');
                                                                canvas.width = img.width;
                                                                canvas.height = img.height;
                                                                ctx.drawImage(img, 0, 0);
                                                                // create a tag
                                                                const a = document.createElement('a');
                                                                a.download = 'download.png';
                                                                a.href = canvas.toDataURL('image/png');
                                                                a.click();
                                                            };
                                                        }
                                                        var file = this.response;
                                                        reader.readAsDataURL(file)
                                                    };
                                                    xhr.send()

                                                }} />
                                        </div>
                                    </div>
                                )
                            }) : " " : <StyledSpinner color="blue" size={50} />}

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Post;