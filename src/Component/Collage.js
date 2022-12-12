import React, { useRef, useState } from "react";
import "./collage.css"
import "./collage2.css"
import html2canvas from "html2canvas"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Button } from "@mui/material";


const Collage = () => {

    let fileObj = [];
    let fileArray = [];
    const [file, setFile] = useState([])
    const sixRef2 = useRef();
    const [grid, setGrid] = useState("")
    const [head, setHead] = useState("")
    const [main, setMain] = useState("")
    const [ads, setAds] = useState("")
    const [side, setSide] = useState("")
    const [foot, setFoot] = useState("")
    const [firstImage, setFirstImage] = useState("")
    const [dragRefData, setDragRefData] = useState("")

    const mainRef = useRef();
    const sideRef = useRef();
    const headRef = useRef();
    const footRef = useRef();
    const adsRef = useRef();
    const imgRef = useRef();

    const uploadMultipleFiles = (e) => {
        fileObj.push(e.target.files)

        for (let i = 0; i < fileObj[0].length; i++) {

            fileArray.push(URL.createObjectURL(fileObj[0][i]))

        }
        setFile(fileArray)

    }

    const handleDownload = (refname) => {
        console.log("ref name", refname.current)
        var link = document.createElement("a");
        html2canvas(refname.current, { allowTaint: true }).then(function (canvas) {

            document.body.appendChild(link);
            link.download = "downloadFrame.jpg";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
        })
    }

    return (
        <div style={{
            height: "80%",
            width: "70%",
            marginTop: "20px",
            marginLeft: "30px"
        }}>

            <div className="main-div">
                <div className="head1"
                    style={{
                        width: "98%"
                    }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                        Select Input File

                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={uploadMultipleFiles}
                            style={{
                                width: '0.1px',
                                height: '0.1px',
                                opacity: '0',
                                overflow: 'hidden',
                                position: 'absolute',
                                zIndex: '-1',
                            }}
                            multiple
                        />

                        <label
                            for="file"
                            style={{
                                height: "30px",
                                width: "150px",
                                backgroundColor: "grey",
                                color: "white",
                                textAlign: "center",
                                paddingTop: "5px"
                                //marginBottom: "-20px"
                            }}>
                            <p >
                                <font size="3px">
                                    Upload Images
                                </font>
                            </p>
                        </label>


                    </div>
                </div>
                <div className="side1"
                    style={{
                        height: "480px",
                        width: "250px",
                        border: "solid",
                        borderColor: "black"
                    }}>
                    <div style={{

                        paddingLeft: "4px",
                        height: "100%",
                        overflowX: "hidden",
                        overflowY: "auto",
                        justifyContent: "space-between"
                        // textAlign: "justify",
                    }}>
                        {file ? file.map(url => {
                            return (
                                <img
                                    ref={imgRef}

                                    src={url}
                                    alt="..."
                                    height="95px"
                                    width="95px"
                                    style={{ padding: "5px" }}
                                    onDragStart={(e) => {
                                        setDragRefData(imgRef)
                                        setFirstImage("url(" + e.target.src + ")")
                                    }}
                                />)
                        }) : " "}
                    </div>

                </div>

                <div clssName="main1"
                    style={{
                        height: "480px",
                        width: "860px"
                    }}>
                    <div class="row">
                        <div class="column"
                            style={{
                                //  backgroundColor: "white"
                            }}
                        >
                            <Button style={{
                                height: "20px",
                                width: "170px",
                                color: "blue",
                                marginBottom: "10px",
                                fontSize: "15px",
                                textTransform: "none"
                            }}
                                onClick={() => { handleDownload(sixRef2) }}>
                                Download
                                <SaveAltIcon style={{
                                    height: "20px",
                                    width: "20px",
                                    marginLeft: "10px"
                                }} />
                            </Button>
                            <div className={grid}
                                style={{
                                    border: "dotted",
                                    borderColor: "darkblue",
                                    marginLeft: "10px"
                                }}
                                ref={sixRef2}>
                                {head ?
                                    <div
                                        ref={headRef}
                                        className={head}
                                        onDragStart={(e) => {
                                            setDragRefData(headRef)
                                            setFirstImage(e.target.style.backgroundImage)
                                            console.log("eee", e.target.style.backgroundImage)
                                        }}
                                        onDragLeave={(e) => {

                                            var a = e.target.style.backgroundImage;
                                            var b = firstImage;
                                            var temp = "";
                                            temp = a;
                                            a = b;
                                            b = temp;
                                            if (dragRefData === imgRef) {
                                                headRef.current.style.backgroundImage = firstImage
                                            }
                                            else {
                                                dragRefData.current.style.backgroundImage = b
                                                headRef.current.style.backgroundImage = a
                                            }
                                            e.stopPropagation();
                                        }}

                                        style={{
                                            backgroundImage: file[0] ? "url(" + file[0] + ")" : " ",
                                            width: "auto",
                                            height: "auto",
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat"

                                        }}></div>
                                    : " "}
                                {main ?
                                    <div
                                        ref={mainRef}
                                        className={main}
                                        onDragStart={(e) => {
                                            setDragRefData(mainRef)
                                            setFirstImage(e.target.style.backgroundImage)
                                        }}
                                        onDragLeave={(e) => {

                                            var a = e.target.style.backgroundImage;
                                            var b = firstImage;
                                            var temp = "";
                                            temp = a;
                                            a = b;
                                            b = temp;
                                            if (dragRefData === imgRef) {
                                                mainRef.current.style.backgroundImage = firstImage
                                            }
                                            else {
                                                dragRefData.current.style.backgroundImage = b
                                                mainRef.current.style.backgroundImage = a
                                            }
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            backgroundImage: file[1] ? "url(" + file[1] + ")" : " ",
                                            width: "auto",
                                            height: "auto",
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat"

                                        }}></div>
                                    : " "}
                                {ads ?
                                    <div className={ads}
                                        ref={adsRef}
                                        onDragStart={(e) => {
                                            setDragRefData(adsRef)

                                            setFirstImage(e.target.style.backgroundImage)
                                        }}
                                        onDragLeave={(e) => {

                                            var a = e.target.style.backgroundImage;
                                            var b = firstImage;
                                            var temp = "";
                                            temp = a;
                                            a = b;
                                            b = temp;
                                            if (dragRefData === imgRef) {
                                                adsRef.current.style.backgroundImage = firstImage
                                            }
                                            else {
                                                dragRefData.current.style.backgroundImage = b
                                                adsRef.current.style.backgroundImage = a
                                            }
                                            e.stopPropagation();
                                        }}

                                        style={{
                                            backgroundImage: file[2] ? "url(" + file[2] + ")" : " ",
                                            width: "auto",
                                            height: "auto",
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat"

                                        }}></div> : " "}
                                {foot ?
                                    <div className={foot}
                                        ref={footRef}
                                        onDragStart={(e) => {
                                            setDragRefData(footRef)

                                            setFirstImage(e.target.style.backgroundImage)
                                        }}
                                        onDragLeave={(e) => {

                                            var a = e.target.style.backgroundImage;
                                            var b = firstImage;
                                            var temp = "";
                                            temp = a;
                                            a = b;
                                            b = temp;
                                            if (dragRefData === imgRef) {
                                                footRef.current.style.backgroundImage = firstImage
                                            }
                                            else {
                                                dragRefData.current.style.backgroundImage = b
                                                footRef.current.style.backgroundImage = a
                                            }
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            backgroundImage: file[3] ? "url(" + file[3] + ")" : " ",
                                            width: "auto",
                                            height: "auto",
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat"

                                        }}></div>
                                    : " "}
                                {side ?
                                    <div
                                        ref={sideRef}
                                        className={side}
                                        onDragStart={(e) => {
                                            setDragRefData(sideRef)
                                            setFirstImage(e.target.style.backgroundImage)
                                        }}
                                        onDragLeave={(e) => {

                                            var a = e.target.style.backgroundImage;
                                            var b = firstImage;
                                            var temp = "";
                                            temp = a;
                                            a = b;
                                            b = temp;
                                            if (dragRefData === imgRef) {
                                                sideRef.current.style.backgroundImage = firstImage
                                            }
                                            else {
                                                dragRefData.current.style.backgroundImage = b
                                                sideRef.current.style.backgroundImage = a
                                            }
                                            e.stopPropagation();
                                        }}

                                        style={{
                                            backgroundImage: file[4] ? "url(" + file[4] + ")" : " ",
                                            width: "auto",
                                            height: "auto",
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat"

                                        }}></div> : " "}


                            </div>


                        </div>
                        <div class="column2"
                            style={{
                                backgroundColor: "white",
                                border: "solid",
                                borderColor: "black"
                            }}>
                            <div style={{
                                margin: "4px, 4px",
                                padding: "4px",
                                height: "100%",
                                overflowX: "hidden",
                                overflowY: "auto",
                                justifyContent: "space-between"
                                // textAlign: "justify",
                            }}>
                                <div className="grid-ex-5"
                                    style={{
                                        marginBottom: "15px",
                                        border: "solid",
                                        borderColor: "grey"
                                    }}
                                    onClick={() => {
                                        setGrid("grid-ex-52")
                                        setHead("head2")
                                        setMain("main2")
                                        setFoot("foot2")
                                        setSide("side2")
                                        setAds("ads2")
                                    }}>
                                    <div className="head"></div>
                                    <div className="main"></div>
                                    <div className="ads"></div>
                                    <div className="foot"></div>
                                    <div className="side"></div>
                                </div>
                                <div className="grid-ex-4"
                                    style={{
                                        marginBottom: "15px",
                                        border: "solid",
                                        borderColor: "grey"
                                    }}
                                    onClick={() => {
                                        setGrid("grid-ex-42")
                                        setHead("head42")
                                        setMain("main42")
                                        setFoot("foot42")
                                        setSide("side42")
                                        setAds("")
                                    }}
                                >

                                    <div className="side4"></div>
                                    <div className="main4"></div>
                                    <div className="foot4"></div>
                                    <div className="head4"></div>
                                </div>
                                <div className="grid-ex-3"
                                    style={{
                                        marginBottom: "15px",
                                        border: "solid",
                                        borderColor: "grey"
                                    }}
                                    onClick={() => {
                                        setGrid("grid-ex-32")
                                        setHead("head32")
                                        setMain("main32")
                                        setSide("side32")
                                        setFoot("")
                                        setAds("")
                                    }}
                                >
                                    <div className="head3"></div>
                                    <div className="main3"></div>
                                    <div className="side3"></div>
                                </div>
                                <div className="grid-ex-22"
                                    style={{
                                        marginBottom: "15px",
                                        border: "solid",
                                        borderColor: "grey"
                                    }}
                                    onClick={() => {
                                        setGrid("grid-ex-222")
                                        setHead("")
                                        setMain("main222")
                                        setSide("side222")
                                        setFoot("")
                                        setAds("")
                                    }}>

                                    <div className="main22"></div>

                                    <div className="side22"></div>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>

            </div>

            {/*sixRef.current ? <div dangerouslySetInnerHTML={{ __html: sixRef.current }}></div> : ""*/}



        </div >
    )
}

export default Collage