import { Button } from "@mui/material";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { fabric } from 'fabric';
import { makeStyles } from '@material-ui/core/styles';
import StyledSpinner from "../StyledComponent";
import Slider from '@mui/material/Slider';
import { ImageListItem, ImageList } from "@material-ui/core";
import { RgbColorPicker } from "react-colorful";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
    getBackgroundData,
    getQuoteCategoryData,
    getQuoteData,
    getStickerCategoryData,
    getStickerData,
    getFontList,
    getCategoryData,
    postSaveCustomPostdata,
    getSingleBusinessData, getFrameData
} from '../API';
import Error from "./Error";
import SmallFrame from "./SmallFrame";
import call from "../LogoImage/call.png"
import email from "../LogoImage/email.png"
import location from "../LogoImage/location.png"
import user from "../LogoImage/user.png"
import website from "../LogoImage/website.png"
import whitecall from "../LogoImage/whitecall.png"
import whiteemail from "../LogoImage/whiteemail.png"
import whitelocation from "../LogoImage/whitelocation.png"
import whiteuser from "../LogoImage/whiteuser.png"
import whitewebsite from "../LogoImage/whitewebsite.png"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
        backgroundColor: 'sky'
    },

    rootb: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    inputfile: {
        /* visibility: hidden etc. wont work */
        width: '0.1px',
        height: '0.1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '-1',

    },

}));





const CreatePost = () => {

    const getVideoElement = (url) => {
        var videoE = document.createElement('video');
        videoE.width = 100;
        videoE.height = 100;
        videoE.muted = true;
        videoE.controls = true;
        (videoE).crossorigin = "anonymous";
        videoE.autoplay = true;
        var source = document.createElement('source');
        source.src = url;
        source.type = 'video/mp4';
        videoE.appendChild(source);
        return videoE;
    }

    const classes = useStyles();
    const [detailFlag, setDetailFlag] = useState("")
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 0 });
    const [fontFlag, setFontFlag] = useState(false)
    const [fontcolorFlag, setFontcolorFlag] = useState(false)
    const [shadowFlag, setshadowFlag] = useState(false)
    const [bFlag, setBFlag] = useState(false)
    const [catvalue, setCatValue] = React.useState(1);
    const [backData, setBackData] = useState([])
    const [stickData, setStickData] = useState([])
    const [stickCatData, setStickCatData] = useState([])
    const [stickDataFlag, setStickDataFlag] = useState(false)
    const [quoteData, setQuoteData] = useState([])
    const [quoteCatData, setQuoteCatData] = useState([])
    const [quoteDataFlag, setQuoteDataFlag] = useState(false)
    const [qData, setQData] = useState("")
    const [fData, setFData] = useState([])
    const [frameFlag, setFrameFlag] = useState(false)
    const [backImageUrl, setBackImageUrl] = useState("")
    const [BackImage, setBackImage] = useState("")
    const [load, setLoad] = useState(false)
    const [pagecount, setPagecount] = useState(2);
    const [pagedata, setPagedata] = useState([])
    const [catList, setCatList] = useState([]);
    const [apiError, setApiError] = useState("")
    const [textAlert, setTextAlert] = useState(" ")

    let effectName = ["none", "brightness(200%)",
        "blur(5px)", "invert(100%)", "contrast(150%)",
        "saturate(500%)", "grayscale(100%)", "hue-rotate(360dg)",]

    const [fontName, setFontName] = useState([])

    let bName = ["normal", "underline", "italic", "bold", "boldItalic"]

    let colorName = ["#f44336", "#e91e63", "#9c27b0",
        "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688",
        "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
        "#ff5722", "#795548", "#607d8b"]
    const [fontshadowcolorValue, setFontShadowColorValue] = useState("black")


    useEffect(() => {
        fetchBackData(1, 1);
        fetchQuoteCategoryData()
        fetchStickCategoryData()
        fetchFont()
        fetchcate()
    }, []);


    const fetchcate = async () => {
        const response = await getCategoryData()
        if (response) {
            if (response?.status === 200) {
                setCatList(response?.data);
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
    const fetchFont = async () => {
        const response = await getFontList();
        if (response) {
            if (response?.status === 200) {
                setFontName(response?.data)
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
    const fetchBackData = async (pno, id) => {
        const response = await getBackgroundData(pno, id);
        if (response) {
            if (response?.status === 200) {
                setBackData(response?.data?.data)
                setBackImageUrl(response?.data?.data[0]?.image)
                setBackImage(response?.data?.data[0]?.image)
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

    };
    const fetchStickData = async (id) => {
        const response = await getStickerData(id);
        if (response) {
            if (response?.status === 200) {
                setStickData(response?.data?.data)
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
    const fetchStickCategoryData = async () => {
        const response = await getStickerCategoryData();
        if (response) {
            if (response?.status === 200) {
                setStickCatData(response?.data)
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

    };
    const fetchQuoteData = async (id) => {
        const response = await getQuoteData(id);
        if (response) {
            if (response?.status === 200) {
                setQuoteData(response?.data?.data)
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
    const fetchQuoteCategoryData = async () => {
        const response = await getQuoteCategoryData();
        if (response) {
            if (response?.status === 200) {
                setQuoteCatData(response?.data)
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


    };
    const getDialog = (data) => {

        setBackImageUrl(data?.image)
        setBackImage(data?.image)

    }

    const [cou, setCou] = useState(0)
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const [textAli, setTextAli] = useState("center")

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= backData.length) {
            setLoading(false);
        }
    }

    const displayFrame = (item) => {


        var group = new fabric.Group();
        group.set({ id: "k1" })
        // console.log("objects", canvas.current.getObjects())

        if (cou > 0) {
            for (var i = 0; i < canvas.current.getObjects().length; i++) {
                //   console.log("all objects", canvas.current.getObjects()[i].id)
                if (canvas.current.getObjects()[i].id === "k1") {
                    canvas.current.getObjects()[i].destroy();
                    canvas.current.remove(canvas.current.getObjects()[i]);
                    canvas.current.renderAll();
                }
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", item?.image, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var res = event.target.result;

                window.fabric.Image.fromURL(res, (oImg) => {
                    oImg.scaleToWidth(200)
                    oImg.scaleToHeight(item?.height / 2.7)
                    oImg.set({
                        left: 0,
                        top: 0,
                        lockMovementX: true,
                        lockMovementY: true,
                        // selectable: false
                    })


                    var m1 = null
                    var m2 = null
                    var pn = null
                    var w = null
                    var em = null
                    var bn = null
                    var add = null
                    var ca = null
                    var us = null
                    var eml = null
                    var loc = null
                    var web = null




                    group.add(oImg);
                    //canvas.current.setActiveObject(group)

                    var m1b = document.createElement("img");
                    var m2b = document.createElement("img");
                    var usb = document.createElement("img");
                    var webb = document.createElement("img");
                    var addb = document.createElement("img");
                    var emb = document.createElement("img");

                    item?.layer?.map((itemunder) => {
                        //mobile1

                        if (itemunder?.res_type == "mobile_no1") {
                            m1 = new fabric.Text(busiData?.mobile_no, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })
                            if (itemunder?.text_color == "ffffff") {
                                m1b.setAttribute('src', whitecall);
                                ca = new fabric.Image(m1b, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                m1b.setAttribute('src', call);
                                ca = new fabric.Image(m1b, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(ca);

                            group.addWithUpdate(m1);
                        }
                        if (itemunder?.res_type == "mobile_no2") {
                            m2 = new fabric.Text(busiData?.mobile_no_2, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })

                            if (itemunder?.text_color == "ffffff") {
                                m2b.setAttribute('src', whitecall);
                                ca = new fabric.Image(m2b, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                m2b.setAttribute('src', call);
                                ca = new fabric.Image(m2b, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(ca);

                            group.addWithUpdate(m2);
                        }
                        if (itemunder?.res_type == "profile_name1") {
                            pn = new fabric.Text(busiData?.name, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })

                            if (itemunder?.text_color == "ffffff") {
                                usb.setAttribute('src', whiteuser);
                                us = new fabric.Image(usb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                usb.setAttribute('src', user);
                                us = new fabric.Image(usb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(us);

                            group.addWithUpdate(pn);
                        }
                        if (itemunder?.res_type == "business_name1") {
                            bn = new fabric.Text(busiData?.business_name, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })
                            group.addWithUpdate(bn);
                        }

                        if (itemunder?.res_type == "email1") {
                            em = new fabric.Text(busiData?.email, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })

                            if (itemunder?.text_color == "ffffff") {
                                emb.setAttribute('src', whiteemail);
                                eml = new fabric.Image(emb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                emb.setAttribute('src', email);
                                eml = new fabric.Image(emb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(eml);

                            group.addWithUpdate(em);
                        }
                        if (itemunder?.res_type == "website1") {
                            w = new fabric.Text(busiData?.website, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: itemunder?.width / 2.7,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })

                            if (itemunder?.text_color == "ffffff") {
                                webb.setAttribute('src', whitewebsite);
                                web = new fabric.Image(webb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                webb.setAttribute('src', website);
                                web = new fabric.Image(webb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(web);
                            group.addWithUpdate(w);
                        }
                        if (itemunder?.res_type == "address1") {
                            add = new fabric.Text(busiData?.address, {
                                top: itemunder?.posy / 2.7,
                                left: itemunder?.posx / 2.7 + 15,
                                fontWeight: "bold",
                                fontFamily: itemunder?.font_name,
                                height: itemunder?.height / 2.7,
                                width: 400,
                                fill: "#" + itemunder?.text_color,
                                fontSize: itemunder?.font_size
                            })

                            if (itemunder?.text_color == "ffffff") {
                                addb.setAttribute('src', whitelocation);
                                loc = new fabric.Image(addb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }
                            if (itemunder?.text_color == "000000") {
                                addb.setAttribute('src', location);
                                loc = new fabric.Image(addb, {
                                    top: itemunder?.posy / 2.7,
                                    left: itemunder?.posx / 2.7 + 2,
                                    scaleX: .025,
                                    scaleY: .025,
                                });
                            }

                            group.addWithUpdate(loc);
                            group.addWithUpdate(add);
                        }
                    }
                    )

                    group.set({ selectable: false })
                    canvas.current.add(group);
                    canvas.current.sendToBack(group);

                    setCou(1)
                    canvas.current.renderAll();
                }, { crossOrigin: 'anonymous' });
            }
            var file = this.response;
            reader.readAsDataURL(file)
        };
        xhr.send()
    }
    const handleLoad = async () => {

        const response = await getBackgroundData(pagecount, catvalue)
        //  console.log("second", response?.data)
        if (response?.success == true)
            setPagedata(backData => [...backData, ...response?.data?.data]);
        else
            setLoad(true)

        setPagecount(pagecount + 1)

    }

    const canvas = useRef(null);

    useEffect(() => {
        canvas.current = initCanvas();
        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };

    }, []);

    useEffect(() => {

        if (BackImage) {

            setTimeout(() => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", BackImage, true);
                xhr.responseType = "blob";
                xhr.onload = function (e) {
                    //   console.log(this.response);
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var res = event.target.result;
                        //setImageUrl2(res)
                        const cDim = document.getElementById("canvas");
                        window.fabric.Image.fromURL(res, (oImg) => {
                            oImg.scaleToWidth(cDim.clientWidth)
                            oImg.scaleToHeight(cDim.clientHeight)
                            canvas.current.setBackgroundImage(oImg);
                            canvas.current.renderAll();
                        });
                    }
                    var file = this.response;
                    reader.readAsDataURL(file)
                };
                xhr.send()
            }, 50);
        }
    }, [BackImage])


    useEffect(() => {
        if (qData) {
            var quot = new fabric.Textbox(qData, {
                fontFamily: 'Delicious_500',
                fontSize: 15,
                height: 543,
                textAlign: 'center',
                width: 350,
                left: 10,
                top: 10
            })
            canvas.current.add(quot);
            canvas.current.bringToFront(quot)
            canvas.current.setActiveObject(quot)
            quot.on('selected', function (e) {
                setDetailFlag("Text")

            });
            canvas.current.renderAll();
        }
    }, [qData])



    function dataURItoBlob(dataURI) {

        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    const saveDownloadFrame = async (frame) => {
        confirmAlert({
            //  title: 'Confirm to submit',
            message: 'Successfully Download ',
            buttons: [
                {
                    label: 'Ok',
                    // onClick: () => handleDelete()
                },

            ]
        });
        const formData = new FormData();

        formData.append("data_file", frame)
        formData.append("unique_id", "test");
        const response = await postSaveCustomPostdata(formData);
        if (response?.success) {

            canvas.current.clear()
            setDetailFlag(" ")
            canvas.current.backgroundColor = "lightgray"
            canvas.current.renderAll();

        }
        //    console.log("save custom download frame post", response)

    }
    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 400,
            width: 400,
            selection: false,
            renderOnAddRemove: true,
        })
    );
    const [busiData, setBusiData] = useState([])

    const handleFrame = async () => {


        canvas.current.discardActiveObject().renderAll()
        setDetailFlag("Frame")

        if (localStorage.getItem("BusinessId")) {
            const response1 = await getSingleBusinessData(localStorage.getItem("BusinessId"))


            if (response1) {
                if (response1?.status === 200) {
                    setBusiData(response1?.data)

                    const username = response1?.data.name ? "1" : "0"
                    const busname = response1?.data.business_name ? "1" : "0"
                    const em = response1?.data.email ? "1" : "0"
                    const webs = response1?.data.website ? "1" : "0"
                    const adr = response1?.data.address ? "1" : "0"
                    const mnf = response1?.data.mobile_no ? "1" : "0"
                    const mns = response1?.data.mobile_no_2 ? "1" : "0"
                    const tag = response1?.data.business_tagline ? "1" : "0"
                    const fid = response1?.data.fb_id ? "1" : "0"
                    const iid = response1?.data.instagram_id ? "1" : "0"
                    const framid = response1?.data?.frame_type_id

                    if (response1?.data) {
                        const response = await getFrameData(username, busname, tag, em, webs, adr, mnf, mns, fid, iid, framid,
                            response1?.data?.id);

                        response?.data?.post?.map((item) => {
                            response1?.data?.frame_ids?.map((itemunder) => {
                                if (itemunder?.frame_id == item?.id) {
                                    fData.push(item)
                                }
                            })
                        })
                        setFrameFlag(true)
                    }
                }
                else if (response1?.status === 401) {
                    localStorage.clear();
                    // window.location.reload();
                    window.location.href = "/"
                }
                else {
                    //   setHomeFlag(true)
                    setApiError(response1?.message ? response1?.message : "Data not Found")
                }
            }
            else {
                setApiError("Some Internal Server Error")
            }
        }

    }

    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var img = document.createElement('img');
    img.src = deleteIcon;

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 4,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24
    });

   
useEffect(()=>{
    var activeObjects = canvas.current.getActiveObjects();
    if (activeObjects) {
        activeObjects.forEach(function(object) {
    
            object.clone(function(clone) {
                canvas.current.add(clone.set({
                    left: object.left + 10, 
                    top: object.top + 10
                }));
            })
    
        });
    }
},[canvas.current])
   
    function deleteObject(eventData, transform) {
        canvas.current.getActiveObjects().forEach((obj) => {
            canvas.current.remove(obj)
        });
        canvas.current.discardActiveObject().renderAll()
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        //   ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
    }


    return (
        <Fragment>
            <div>
                {
                    apiError !== undefined && (
                        <Error data={apiError}/>
                    )
                }

                <div className="profile-header">
                    <h1>Create Motivation Post</h1>
                    <div>
                        <Button
                            variant="contained"
                            className="remove-btn"
                            onClick={() => {
                                canvas.current.getActiveObjects().forEach((obj) => {
                                    canvas.current.remove(obj)
                                });
                                canvas.current.discardActiveObject().renderAll()
                            }}
                        >Remove</Button>
                        <Button variant="contained" className="download-btn"
                            onClick={() => {
                                canvas.current.discardActiveObject().renderAll();

                                var _canvasObject = document.getElementById("canvas")
                                var link = document.createElement("a");
                                link.href = _canvasObject.toDataURL({ format: 'png', multiplier: 4 });
                                link.download = "Custom Frame.png";
                                link.click();

                                var img = _canvasObject.toDataURL({ format: 'png', multiplier: 4 });
                                var file = dataURItoBlob(img);
                                saveDownloadFrame(file);
                            }}
                        >Download</Button>
                    </div>

                </div>

                <div className="cp-main">
                    <div className="cp-left">
                        <div className="cp-frame">
                            <canvas id="canvas" />
                        </div>
                        <div>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    setDetailFlag("Text")
                                    canvas.current.discardActiveObject().renderAll()


                                    var rectangle = new fabric.Rect({
                                        height: 50,
                                        width: 250,
                                        originX: 'center',
                                        originY: 'center',
                                        fill: '',
                                        opacity: 10
                                    });


                                    var text = new fabric.Textbox("Enter Your Text", {
                                        originX: 'center',
                                        originY: 'center',
                                        textAlign: 'center',
                                        fontSize: 15,
                                        width: 250,
                                        fill: '#000000'
                                    });

                                    var group = new fabric.Group([rectangle, text], {
                                        left: 100,
                                        top: 100,
                                        width: 250,
                                        height: 50,
                                        originX: 'center',
                                        originY: 'center',
                                    });


                                    group.on('mousedblclick', () => {
                                        // textForEditing is temporary obj, 
                                        // and will be removed after editing
                                        let textForEditing = new fabric.Textbox(text.text, {
                                            originX: 'center',
                                            originY: 'center',
                                            textAlign: text.textAlign,
                                            fontSize: text.fontSize,

                                            left: group.left,
                                            top: group.top,
                                        })

                                        // hide group inside text
                                        text.visible = false;
                                        // note important, text cannot be hidden without this
                                        group.addWithUpdate();

                                        textForEditing.visible = true;
                                        // do not give controls, do not allow move/resize/rotation on this 
                                        textForEditing.hasControls = false;


                                        // now add this temporary obj to canvas
                                        canvas.current.add(textForEditing);
                                        canvas.current.setActiveObject(textForEditing);
                                        // make the cursor showing
                                        textForEditing.enterEditing();
                                        textForEditing.selectAll();


                                        // editing:exited means you click outside of the textForEditing
                                        textForEditing.on('editing:exited', () => {
                                            let newVal = textForEditing.text;
                                            let oldVal = text.text;

                                            // then we check if text is changed
                                            if (newVal !== oldVal) {
                                                text.set({
                                                    text: newVal,
                                                    visible: true,
                                                })

                                                // comment before, you must call this
                                                group.addWithUpdate();

                                                // we do not need textForEditing anymore
                                                textForEditing.visible = false;
                                                canvas.current.remove(textForEditing);

                                                // optional, buf for better user experience
                                                canvas.current.setActiveObject(group);
                                            }
                                        })
                                    })


                                    //   group.enterEditing();


                                    canvas.current.bringToFront(group)

                                    canvas.current.setActiveObject(group)
                                    canvas.current.add(group)
                                    canvas.current.renderAll()

                                    //   console.log("avtive object", canvas.current.getActiveObject)
                                  /*  var name = new fabric.Textbox('Enter Your Text', {
                                        fontFamily: 'Delicious_500',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        height: 243,
                                        width: 300,
                                        maxWidth: 300,
                                        //    objectCaching: false,
                                        left: 35,
                                        top: 85,
                                        //     cornerSize: 12,
                                        //      textAlign: textAli,
                                        //       cornerColor: 'white', //corner fill color 
                                        //       cornerStrokeColor: 'blue',
                                        //       cornerStyle: "circle",
                                        //       transparentCorners: false,
                                        //     cursorStyle: 'pointer',
                                        //     mouseUpHandler: deleteObject,
                                        //    render: renderIcon,
                                        //     objectCaching: false,
                                    })
                                    //  name.setControlVisible('tl', true);
                                    //   name.setControlVisible('mt', false);
                                    //    name.setControlVisible('tr', true);
                                    //    name.setControlVisible('ml', false);
                                    //    name.setControlVisible('mr', false);
                                    //    name.setControlVisible('bl', true);
                                    //    name.setControlVisible('mb', false);
                                    //   name.setControlVisible('br', true);

                                    canvas.current.add(name);
                                    canvas.current.bringToFront(name)
                                    //             canvas.current.setActiveObject(name);


                                    name.on('selected', function (e) {
                                        setDetailFlag("Text")


                                    });

                                    canvas.current.renderAll();
                                */}}>Text</Button>
                            <Button variant="contained" className="cp-btns cp-file-btn" >
                                <input type="file" id="file" className={classes.inputfile}
                                    onChange={(e) => {
                                        canvas.current.discardActiveObject().renderAll()
                                        var file = e.target.files[0];
                                        var reader = new FileReader();
                                        reader.onload = function (f) {
                                            var data = f.target.result;
                                            fabric.Image.fromURL(data, function (img) {
                                                var oImg = img.set({ left: 0, top: 0, angle: 0 }).scale(0.9);
                                                img.scaleToWidth(100)
                                                img.scaleToHeight(100)
                                                canvas.current.centerObject(oImg);
                                                canvas.current.bringToFront(oImg)
                                                canvas.current.setActiveObject(oImg)
                                                canvas.current.add(oImg).renderAll();
                                                canvas.current.setActiveObject(oImg);
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                /><label for="file">
                                    Image
                                </label>
                            </Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={handleFrame}
                            >Frames</Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    canvas.current.discardActiveObject().renderAll()
                                    setDetailFlag("Background")
                                }}>Background</Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    canvas.current.discardActiveObject().renderAll()
                                    setDetailFlag("Quote")
                                }}>Quote</Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    canvas.current.discardActiveObject().renderAll()
                                    setDetailFlag("Color")
                                }}>Color</Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    canvas.current.discardActiveObject().renderAll()
                                    setDetailFlag("Sticker")
                                }}>Sticker</Button>
                            <Button variant="contained" className="cp-btns"
                                onClick={() => {
                                    canvas.current.discardActiveObject().renderAll()
                                    setDetailFlag("Effect")
                                }}>Effects</Button>
                        </div>
                    </div>

                    <div className="cp-right">
                        <div>
                            {detailFlag === "Text" ?
                                <>

                                    <div className="text-frame">
                                        <span
                                            onClick={() => {
                                                if (canvas.current.getActiveObject()) {
                                                    setTextAlert(" ")
                                                    setFontFlag(true)
                                                    setFontcolorFlag(false)
                                                    setshadowFlag(false)
                                                    setBFlag(false)
                                                }
                                                else {
                                                    setTextAlert("Please Select Text")
                                                    setFontFlag(false)
                                                }
                                            }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="40px" height="40px"
                                                viewBox="0 0 225.000000 225.000000"
                                                preserveAspectRatio="xMidYMid meet">
                                                <metadata>
                                                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                                                </metadata>
                                                <g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
                                                    fill="darkblue" stroke="none">
                                                    <path d="M1614 2220 c-204 -30 -380 -174 -524 -430 -64 -114 -56 -110 -180
                                            -110 -95 0 -111 -3 -141 -23 -69 -46 -73 -147 -8 -201 27 -23 39 -26 114 -26
                                                46 0 86 -3 88 -7 4 -8 -151 -621 -243 -965 -24 -86 -52 -172 -63 -190 l-20
                                                        -33 -8 30 c-12 43 -59 85 -109 96 -134 30 -249 -70 -226 -196 35 -186 393
                                                -188 600 -4 63 57 151 183 194 281 51 111 117 328 201 660 45 174 81 319 81
                                                322 0 3 56 6 125 6 l124 0 35 31 c60 52 61 126 1 186 -33 33 -34 33 -124 33
                                                                -50 0 -91 1 -91 3 0 15 53 154 78 203 30 60 106 164 120 164 4 0 5 -22 4 -50
                                                -5 -64 25 -115 82 -141 55 -25 94 -24 146 4 82 43 113 151 71 243 -43 96 -165
                                                    138 -327 114z"/>
                                                </g>
                                            </svg>
                                        </span>
                                        <span
                                            onClick={() => {
                                                if (canvas.current.getActiveObject()) {
                                                    setTextAlert(" ")
                                                    setFontFlag(false)
                                                    setFontcolorFlag(true)
                                                    setshadowFlag(false)
                                                    setBFlag(false)
                                                }
                                                else {
                                                    setFontcolorFlag(false)
                                                    setTextAlert("Please Select Text")
                                                }

                                            }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="50px" height="50px" viewBox="0 0 225.000000 225.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
                                                    fill="darkblue" stroke="none">
                                                    <path d="M1111 2059 c-301 -40 -577 -247 -775 -580 -203 -340 -246 -694 -122
                                            -999 51 -125 149 -232 251 -275 103 -43 258 -25 309 35 39 46 46 92 45 271 -1
                                                144 2 171 20 220 52 137 181 186 371 141 47 -11 86 -19 87 -18 2 1 -15 27 -38
                                                57 -37 50 -44 54 -91 61 -61 7 -95 31 -122 84 -17 32 -22 64 -26 184 -4 113
                                                -10 152 -24 179 l-18 34 99 -5 c152 -8 260 -59 320 -150 29 -43 36 -100 21
                                            -163 -7 -27 2 -43 108 -180 63 -82 122 -151 129 -153 46 -11 200 93 306 206
                                            188 199 203 382 53 615 -181 280 -591 478 -903 436z m426 -189 c86 -52 94
                                            -192 14 -271 -93 -93 -227 -52 -247 77 -21 145 120 263 233 194z m-505 -36
                                            c113 -106 78 -301 -54 -298 -135 4 -206 239 -96 319 36 26 111 15 150 -21z
                                            m-393 -335 c73 -40 106 -126 74 -189 -22 -43 -76 -80 -117 -80 -76 1 -161 71
                                            -172 142 -18 111 110 187 215 127z m1277 -18 c89 -54 82 -216 -13 -288 -47
                                            -36 -125 -42 -171 -13 -91 56 -79 219 21 291 49 35 115 39 163 10z m-1362
                                            -742 c22 -6 56 -29 82 -54 129 -130 73 -355 -89 -355 -114 0 -207 103 -207
                                        229 0 61 13 97 48 135 48 51 96 64 166 45z"/>
                                                    <path d="M1095 1247 c3 -179 18 -206 111 -207 37 0 109 50 131 93 51 99 -18
                                                191 -172 231 -32 9 -62 16 -66 16 -4 0 -5 -60 -4 -133z"/>
                                                    <path d="M1348 986 l-27 -24 302 -395 c166 -218 304 -396 307 -396 3 0 17 10
                            33 22 l28 23 -303 397 c-167 218 -305 396 -308 396 -3 0 -17 -10 -32 -23z"/>
                                                </g>
                                            </svg>
                                        </span>
                                        <span
                                            onClick={() => {
                                                if (canvas.current.getActiveObject()) {
                                                    setTextAlert(" ")
                                                    setFontFlag(false)
                                                    setFontcolorFlag(false)
                                                    setshadowFlag(true)
                                                    setBFlag(false)
                                                }
                                                else {
                                                    setshadowFlag(false)
                                                    setTextAlert("Please Select Text")
                                                }
                                            }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="50px" height="50px" viewBox="0 0 200.000000 200.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                                                    fill="darkblue" stroke="none">
                                                    <path d="M562 1585 c-30 -7 -91 -31 -136 -53 -65 -33 -98 -58 -154 -117 -182
                                                -190 -222 -436 -111 -674 136 -292 491 -421 787 -286 53 24 54 24 90 6 88 -44
                                                144 -56 262 -56 86 0 129 5 170 19 201 69 337 205 406 406 26 77 26 262 0 340
                                                -68 201 -204 337 -406 406 -40 14 -84 19 -165 19 -117 0 -178 -12 -257 -52
                                                l-48 -23 -51 26 c-100 50 -270 68 -387 39z m301 -76 c37 -11 67 -22 67 -26 0
                                                            -3 -30 -37 -66 -75 -220 -233 -219 -584 3 -818 36 -39 64 -72 62 -74 -2 -2
                                            -33 -14 -69 -26 -95 -33 -230 -32 -328 3 -91 32 -156 73 -219 140 -101 106
                                            -146 220 -145 367 0 115 24 199 80 286 136 209 370 294 615 223z m610 -4 c220
                                            -75 359 -271 359 -505 0 -237 -142 -433 -372 -510 -91 -31 -230 -31 -320 0
                                        -36 12 -67 24 -69 26 -3 3 21 30 51 62 68 68 119 151 150 241 31 88 33 267 4
                                        351 -34 99 -75 169 -141 239 -36 37 -65 71 -65 74 0 9 102 40 160 48 77 10
                                                164 1 243 -26z m-402 -122 c32 -31 59 -60 59 -64 0 -4 -21 -2 -47 6 -27 7 -75
                                                    21 -108 30 l-60 17 38 34 c20 19 42 34 48 34 6 0 37 -25 70 -57z m84 -141 c24
                                        -7 33 -18 47 -55 10 -26 14 -47 10 -47 -4 0 -74 18 -157 40 -82 23 -167 45
                                        -187 51 -43 11 -46 20 -18 59 l20 28 127 -34 c71 -19 141 -38 158 -42z m-137
                                        -116 c112 -30 205 -56 207 -58 2 -2 6 -25 10 -52 7 -44 6 -48 -11 -43 -11 3
                                        -113 31 -229 62 -115 31 -213 58 -216 61 -11 6 12 84 25 84 6 0 103 -24 214
                                        -54z m-3 -161 c115 -31 210 -57 212 -58 1 -2 -3 -22 -9 -45 -6 -26 -16 -42
                                        -25 -42 -13 0 -234 58 -370 96 -49 14 -52 17 -58 54 -8 45 0 63 23 56 10 -3
                                        111 -30 227 -61z m-22 -161 c97 -26 177 -52 177 -58 0 -6 -9 -22 -20 -36 l-19
                                        -25 -108 28 c-222 58 -210 53 -227 103 -14 42 -14 45 2 40 9 -2 97 -26 195
                                    -52z m80 -173 c9 -9 -57 -71 -74 -71 -12 0 -129 109 -129 120 0 9 191 -38 203
                                    -49z"/>
                                                </g>
                                            </svg>
                                        </span>
                                        <span
                                            onClick={() => {
                                                if (canvas.current.getActiveObject()) {
                                                    setTextAlert(" ")
                                                    setFontFlag(false)
                                                    setFontcolorFlag(false)
                                                    setshadowFlag(false)
                                                    setBFlag(true)
                                                }
                                                else {
                                                    setBFlag(false)
                                                    setTextAlert("Please Select Text")
                                                }
                                            }}>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                width="30px" height="40px"
                                                viewBox="0 0 703.000000 768.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,768.000000) scale(0.100000,-0.100000)"
                                                    fill="darkblue" stroke="none"  >
                                                    <path d="M25 7654 c-24 -26 -25 -31 -25 -179 0 -139 2 -155 21 -179 19 -24 27
                                                    -26 92 -26 134 0 351 -20 436 -40 266 -64 393 -227 458 -593 15 -84 17 -330
                                                        20 -2682 3 -1744 1 -2632 -6 -2718 -37 -455 -170 -664 -466 -737 -94 -23 -269
                                                        -40 -408 -40 -91 0 -100 -2 -122 -25 -24 -23 -25 -28 -25 -175 0 -148 1 -151
                                                        25 -176 l25 -25 2102 4 c1444 3 2137 8 2213 15 520 53 782 102 1110 209 843
                                                        275 1338 797 1475 1557 72 398 33 885 -96 1220 -211 545 -664 927 -1379 1159
                                                        -60 20 -143 45 -182 57 -40 11 -73 25 -73 30 0 5 27 23 60 40 552 279 968 795
                                                        1054 1309 30 179 14 440 -39 652 -188 748 -875 1201 -2013 1328 -336 38 -509
                                                        41 -2395 41 l-1838 0 -24 -26z m3751 -479 c306 -53 515 -173 674 -386 178
                                                    -239 259 -571 247 -1017 -5 -218 -22 -334 -69 -482 -114 -357 -340 -584 -703
                                                    -706 -206 -69 -276 -76 -787 -81 l-458 -5 0 1159 c0 1218 1 1238 44 1322 63
                                                    121 234 189 529 211 159 11 411 4 523 -15z m-140 -3175 c202 -10 331 -28 479
                                                    -67 295 -77 510 -199 703 -397 236 -244 369 -549 423 -971 15 -117 15 -452 0
                                                    -580 -91 -776 -507 -1244 -1235 -1390 -195 -38 -306 -48 -556 -48 -482 0 -678
                                                    72 -747 276 -17 49 -18 148 -21 1620 l-2 1567 387 0 c214 0 470 -5 569 -10z"/>
                                                </g>
                                            </svg>
                                        </span>
                                    </div><div className="text-frame" style={{ marginTop: "5px" }}>
                                        <span onClick={() => {

                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set('flipX', true);
                                                /*var activeObject = canvas.current.getActiveObject();
                                                activeObject._objects[1].set({
                                                    slipX: true
                                                })*/
                                                canvas.current.renderAll();
                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>FlipX</span>
                                        <span onClick={() => {
                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set('flipY', true);
                                                canvas.current.renderAll();
                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>FlipY</span>
                                        <br />
                                        <span onClick={() => {

                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set("textAlign", "justify-left ")
                                                canvas.current.renderAll();
                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>
                                            left
                                        </span>
                                        <span onClick={() => {

                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set("textAlign", "center")
                                                canvas.current.renderAll();

                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>
                                            center
                                        </span>
                                        <span onClick={() => {
                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set("textAlign", "right")
                                                canvas.current.renderAll();

                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>
                                            right
                                        </span>
                                        <span onClick={() => {
                                            if (canvas.current.getActiveObject()) {
                                                setTextAlert(" ")
                                                var obj = canvas.current.getActiveObject();
                                                obj.set("textAlign", "justify")
                                                canvas.current.renderAll();

                                            }
                                            else {

                                                setTextAlert("Please Select Text")
                                            }

                                        }}>
                                            justify
                                        </span>
                                    </div>
                                    <div className="text-componant">
                                        <div className="text-danger" style={{ color: "red" }}>{textAlert}</div>
                                        {
                                            shadowFlag ?
                                                <div>
                                                    <div className="color-frame">
                                                        <span>Shadow Color</span>
                                                        <ImageList sx={{
                                                            width: 100,
                                                            height: 250
                                                        }}
                                                            cols={5}
                                                            rowHeight={30}>
                                                            {colorName?.map((item) => {
                                                                return (
                                                                    <ImageListItem key={item}
                                                                        style={{
                                                                            width: "35px"
                                                                        }}>
                                                                        <p style={{
                                                                            backgroundColor: item,
                                                                            height: "30px",
                                                                            width: "30px",
                                                                            borderRadius: "50%"
                                                                        }}
                                                                            onClick={() => {
                                                                                var shadow = new fabric.Shadow({
                                                                                    color: item,
                                                                                    blur: 5
                                                                                });
                                                                                var obj = canvas.current.getActiveObject();
                                                                                // obj.set('shadow', shadow);
                                                                                obj._objects[1].set({
                                                                                    shadow: shadow
                                                                                }) 
                                                                                obj.text = obj.text + " ";
                                                                                canvas.current.renderAll();
                                                                                obj.text = obj.text;
                                                                                canvas.current.renderAll();
                                                                                setTimeout(() => {
                                                                                    setFontShadowColorValue(item)
                                                                                }, 50)
                                                                            }}
                                                                        />
                                                                    </ImageListItem>
                                                                )
                                                            })}
                                                        </ImageList>
                                                    </div>

                                                    <div className="color-frame">
                                                        <span>Spread</span>
                                                        <Slider
                                                            aria-label="Temperature"
                                                            defaultValue={0}
                                                            // getAriaValueText={valuetext}
                                                            valueLabelDisplay="auto"
                                                            min={0}
                                                            max={10}
                                                            style={{ width: "250px", margin: "0px 0px 0px 15px" }}
                                                            onChange={(e) => {
                                                                var shadow = new fabric.Shadow({
                                                                    color: fontshadowcolorValue,
                                                                    blur: e.target.value
                                                                });
                                                                var obj = canvas.current.getActiveObject();
                                                               // obj.set('shadow', shadow);
                                                               obj._objects[1].set({
                                                                shadow: shadow
                                                            }) 
                                                               obj.text = obj.text + " ";
                                                                canvas.current.renderAll();
                                                                obj.text = obj.text;
                                                                canvas.current.renderAll();
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                : " "
                                        }
                                        {fontFlag ?
                                            <>
                                                <div className="color-frame">
                                                    <span>Font Family </span>
                                                    <select
                                                        onChange={(e) => {

                                                            var obj = canvas.current.getActiveObject();
                                                            var activeObject = canvas.current.getActiveObject();
                                                            activeObject._objects[1].set({
                                                                fontFamily: e.target.value
                                                            })
                                                         //   obj.set('fontFamily', e.target.value);
                                                            obj.text = obj.text + " ";
                                                            canvas.current.renderAll();
                                                            obj.text = obj.text;
                                                            canvas.current.renderAll();
                                                        }}>
                                                        {
                                                            fontName?.map((item) => {
                                                                return (
                                                                    <>
                                                                        <option>{item?.name}</option>
                                                                    </>
                                                                )
                                                            })}
                                                    </select>
                                                </div>
                                                <div className="color-frame">
                                                    <span>FontSize </span>
                                                    <Slider defaultValue={15}
                                                        aria-label="Default"
                                                        valueLabelDisplay="auto"
                                                        min={15}
                                                        max={50}
                                                        onChange={(e) => {

                                                            console.log("current group", canvas.current.getActiveObject())
                                                            var activeObject = canvas.current.getActiveObject();
                                                            activeObject._objects[1].set({
                                                                fontSize: e.target.value
                                                            })
                                                            canvas.current.renderAll();

                                                        }}
                                                        style={{ width: "350px", margin: "0px 0px 0px 15px" }}
                                                    />
                                                </div>
                                            </> : " "}
                                        {bFlag ?
                                            <div className="color-frame">
                                                <select
                                                    onChange={(e) => {
                                                        var obj = canvas.current.getActiveObject();
                                                       // obj.set('fontStyle', e.target.value);
                                                       obj._objects[1].set({
                                                        fontStyle: e.target.value
                                                    })
                                                        obj.text = obj.text + " ";
                                                        canvas.current.renderAll();
                                                        obj.text = obj.text;
                                                        canvas.current.renderAll();
                                                    }}>
                                                    {bName?.map((item) => {
                                                        return (
                                                            <>
                                                                <option>{item}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            : " "}
                                        {
                                            fontcolorFlag ?
                                                <div className="color-frame">
                                                    <span>Font Color</span>
                                                    <ImageList
                                                        sx={{ width: 350, height: 250 }}
                                                        cols={10}
                                                        rowHeight={30}>
                                                        {colorName?.map((item) => {

                                                            return (
                                                                <ImageListItem key={item}
                                                                    style={{
                                                                        width: "35px"
                                                                    }}>
                                                                    <p style={{
                                                                        backgroundColor: item,
                                                                        height: "30px",
                                                                        width: "30px",
                                                                        borderRadius: "50%"
                                                                    }}
                                                                        onClick={() => {
                                                                            var obj = canvas.current.getActiveObject();
                                                                            //obj.set('fill', item);
                                                                            var activeObject = canvas.current.getActiveObject();
                                                                            activeObject._objects[1].set({
                                                                                fill: item
                                                                            })
                                                                            obj.text = obj.text + " ";
                                                                            canvas.current.renderAll();
                                                                            obj.text = obj.text;
                                                                            canvas.current.renderAll();
                                                                        }}
                                                                    />
                                                                </ImageListItem>
                                                            )
                                                        })}
                                                    </ImageList>
                                                </div>
                                                : <>
                                                </>
                                        }
                                    </div>

                                    <div className="text-frame-btn">
                                        <Button variant='contained' onClick={() => { setDetailFlag(" ") }}>Save</Button>
                                    </div>
                                </>
                                : " "}

                            {detailFlag === "Frame" ?
                                <div className="text-frame">
                                    {fData ? fData?.length > 0 ?
                                        fData?.map((item, index) => {
                                            return (
                                                <div className="tf-inner"
                                                    onClick={() => { displayFrame(item) }}
                                                >
                                                    <SmallFrame
                                                        item={item}
                                                        data={busiData}
                                                    />
                                                </div>
                                            )
                                        }) : <StyledSpinner size={50} /> : ""}

                                </div>
                                : ""
                            }
                            {detailFlag === "Sticker" ?
                                <>
                                    <div className="sticker-frame">
                                        <h2>Select Sticker Category</h2>
                                        <div className="sticker-inner">
                                            {
                                                stickDataFlag ?
                                                    stickData ?
                                                        stickData?.length > 0 ?
                                                            stickData?.map((item) => {
                                                                return (
                                                                    <img src={item?.image}
                                                                        style={{ height: "130px", width: "130px", cursor: "pointer" }}
                                                                        onClick={() => {
                                                                            var xhr = new XMLHttpRequest();
                                                                            xhr.open("GET", item?.image, true);
                                                                            xhr.responseType = "blob";
                                                                            xhr.onload = function (e) {
                                                                                var reader = new FileReader();
                                                                                reader.onload = function (event) {
                                                                                    var res = event.target.result;
                                                                                    window.fabric.Image.fromURL(res, (oImg) => {
                                                                                        oImg.scaleToWidth(761 / 3)
                                                                                        oImg.scaleToHeight(452 / 3)
                                                                                        oImg.set({
                                                                                            left: 231 / 2,
                                                                                            top: 316 / 3,
                                                                                        })
                                                                                        canvas.current.add(oImg);
                                                                                        canvas.current.bringToFront(oImg)
                                                                                        canvas.current.setActiveObject(oImg)
                                                                                        canvas.current.renderAll();
                                                                                    }, { crossOrigin: 'anonymous' });
                                                                                }
                                                                                var file = this.response;
                                                                                reader.readAsDataURL(file)
                                                                            };
                                                                            xhr.send()
                                                                        }}
                                                                    ></img>
                                                                )
                                                            })
                                                            : <StyledSpinner color="blue" size={50} />
                                                        : <StyledSpinner color="blue" size={50} />
                                                    :
                                                    stickCatData ?
                                                        stickCatData?.length > 0 ?
                                                            stickCatData?.map((item, index) => {
                                                                //    console.log("stickername", item)
                                                                return (
                                                                    <div className="sticker-frame-inner" style={{
                                                                        backgroundImage: 'url(' + item?.image + ')',
                                                                        //background: "navy", 

                                                                    }} onClick={() => {
                                                                        fetchStickData(item?.id)
                                                                        setStickDataFlag(true)
                                                                    }}>
                                                                        {item?.name}
                                                                    </div>
                                                                )
                                                            })
                                                            : <StyledSpinner color="blue" size={50} /> :
                                                        " "
                                            }
                                        </div>
                                    </div>
                                </> : ""}
                            {detailFlag === "Effect" ?
                                <>
                                    <div className="effect-main">

                                        <ImageList
                                            //rowHeight="120px"                                           
                                            cols={4} >
                                            {effectName.map((item) => {
                                                return (
                                                    <div className="effect-grid">
                                                        <ImageListItem>
                                                            <img
                                                                src={backImageUrl}
                                                                style={{
                                                                    webkitFilter: item,
                                                                }}
                                                                onClick={() => {

                                                                    setTimeout(() => {
                                                                        var xhr = new XMLHttpRequest();
                                                                        xhr.open("GET", backImageUrl, true);
                                                                        xhr.responseType = "blob";
                                                                        xhr.onload = function (e) {
                                                                            var reader = new FileReader();
                                                                            reader.onload = function (event) {
                                                                                var res = event.target.result;
                                                                                //setImageUrl2(res)
                                                                                const cDim = document.getElementById("canvas");
                                                                                window.fabric.Image.fromURL(res, (oImg) => {
                                                                                    oImg.scaleToWidth(cDim.clientWidth)
                                                                                    oImg.scaleToHeight(cDim.clientHeight)
                                                                                    canvas.current.setBackgroundImage(oImg);
                                                                                    if (item == "brightness(200%)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Brightness({
                                                                                            brightness: 0.10
                                                                                        }));
                                                                                    if (item == "blur(5px)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Blur({
                                                                                            blur: 0.5
                                                                                        }))

                                                                                    if (item == "invert(100%)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Invert())
                                                                                    if (item == "contrast(150%)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Contrast({
                                                                                            contrast: 0.25
                                                                                        }));
                                                                                    if (item == "saturate(500%)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Saturation({
                                                                                            saturation: 1
                                                                                        }))
                                                                                    if (item == "hue-rotate(360dg)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.HueRotation({
                                                                                            rotation: -0.5
                                                                                        }))

                                                                                    if (item == "grayscale(100%)")
                                                                                        canvas.current.backgroundImage.filters.push(new fabric.Image.filters.Grayscale());
                                                                                    canvas.current.backgroundImage.applyFilters();
                                                                                    canvas.current.renderAll();
                                                                                });
                                                                            }
                                                                            var file = this.response;
                                                                            reader.readAsDataURL(file)
                                                                        };
                                                                        xhr.send()
                                                                    }, 50);
                                                                }

                                                                }
                                                            />
                                                        </ImageListItem>
                                                        <span>{item.split("(")[0]}</span>
                                                    </div>)
                                            })}
                                        </ImageList>
                                    </div>
                                </>
                                : ""}

                            {detailFlag === "Color" ?
                                <div className="color-frame">
                                    <center>
                                        < RgbColorPicker
                                            color={color}
                                            onChange={setColor}
                                            style={{
                                                height: "300px", width: "300px"
                                            }} />
                                        <div className="color-btn">
                                            <Button variant="outlined"
                                                onClick={() => {
                                                    canvas.current.backgroundImage = "";
                                                    canvas.current.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
                                                    canvas.current.renderAll();
                                                }}>
                                                Save
                                            </Button>
                                            <Button variant="outlined"
                                                onClick={() => {
                                                    setBackImage("")
                                                    setColor({ r: 0, g: 0, b: 0, a: 0 })
                                                }}>
                                                Reset
                                            </Button>
                                        </div>
                                        <div>Color RGB :{color.r},{color.g},{color.b},{color.a}</div>
                                    </center>
                                </div> :
                                ""}

                            {detailFlag === "Quote" ?
                                <>
                                    <div className="quote-frame">
                                        <h2>Select Quote Category</h2>

                                        <div className="quote-list">
                                            {quoteDataFlag ?
                                                quoteData ?
                                                    quoteData?.length > 0 ?
                                                        quoteData?.map((item) => {
                                                            return (
                                                                <Button
                                                                    className="quote-txt"
                                                                    variant="contained"
                                                                    onClick={() => {
                                                                        setQData(item?.content)
                                                                        setDetailFlag("")
                                                                    }}
                                                                >
                                                                    {item?.content}
                                                                </Button>
                                                            )
                                                        })
                                                        : <StyledSpinner color="blue" size={50} />
                                                    : ""
                                                :
                                                quoteCatData ?
                                                    quoteCatData?.length > 0 ?
                                                        quoteCatData?.map((item, index) => {
                                                            return (
                                                                <div className="quote-list-inner" style={{
                                                                    backgroundImage: 'url(' + item?.image + ')',
                                                                }} onClick={() => {
                                                                    fetchQuoteData(item?.id)
                                                                    setQuoteDataFlag(true)
                                                                }}>
                                                                    {item?.name}
                                                                </div>
                                                            )
                                                        })
                                                        : <StyledSpinner color="blue" size={50} /> : ""}
                                        </div>
                                    </div>
                                </>
                                : " "}

                            {detailFlag === "Background" ?
                                <>
                                    <div className="bg-frame">
                                        <div className="bg-hd">
                                            <h2>Select Background</h2>
                                            <Button variant='contained'
                                                onClick={() => { setDetailFlag(" ") }} > Save</Button>
                                        </div>
                                        <div>
                                            <select
                                                onChange={(e) => {
                                                    //  setPagedata([])
                                                    fetchBackData(1, e.target.value)
                                                    setLoad(false)
                                                    setCatValue(e.target.value)
                                                }}
                                            >
                                                {catList ? catList?.length > 0 ?
                                                    catList?.map((item, index) => {

                                                        return (
                                                            <option value={item?.id}>{item?.name}</option>)
                                                    }) : <StyledSpinner color="blue" size={50} />
                                                    : ""}
                                            </select>
                                        </div>

                                        {!loading && <i className="fa fa-spinner"></i>}

                                        <div class="bg-box-row">
                                            <ImageList
                                                rowHeight="auto"
                                                sx={{
                                                    width: "100%",
                                                    //height: "250px"
                                                }}
                                                cols={5}
                                            >

                                                {backData.length > 0 ?
                                                    backData.map((item, key) => {

                                                        return (
                                                            <ImageListItem
                                                                key={item?.id}>
                                                                <img
                                                                    onClick={() => getDialog(item)}
                                                                    style={{
                                                                        visibility: loading ? "hidden" : "",
                                                                        //height:"100px",width:"100px"
                                                                    }}
                                                                    onLoad={imageLoaded}
                                                                    referrerPolicy="no-referrer"
                                                                    src={item?.image}
                                                                    alt="background" />
                                                            </ImageListItem>
                                                        )
                                                    })

                                                    : <>
                                                        {backData ?
                                                            <StyledSpinner
                                                                color="blue"
                                                                size={50} />
                                                            : backData == undefined ?
                                                                <>
                                                                    Data Not Found    </>
                                                                :
                                                                <></>
                                                        }
                                                    </>
                                                }
                                                {pagedata ?
                                                    pagedata.length > 0
                                                        ?
                                                        pagedata.map((item) => {

                                                            return (
                                                                <ImageListItem
                                                                    key={item?.id}>
                                                                    <img
                                                                        onClick={() => getDialog(item)}
                                                                        style={{
                                                                            objectFit: "cover",
                                                                        }}
                                                                        referrerPolicy="no-referrer"
                                                                        src={item?.image}
                                                                        alt="background" />
                                                                </ImageListItem>

                                                            )
                                                        })
                                                        :
                                                        <></>

                                                    :
                                                    <StyledSpinner size={50} />
                                                }
                                            </ImageList>
                                        </div>
                                        <div className="load-more-btn">
                                            {load ? "  " :
                                                <Button onClick={() => handleLoad()}>
                                                    Load More
                                                </Button>
                                            }
                                        </div>
                                    </div>
                                </>
                                : <>
                                </>

                            }
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default CreatePost;