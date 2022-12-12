import React, { useState, useRef, useEffect } from "react"
import { FormLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Account from "./Account"
import { Button, ImageListItem, ImageList } from "@material-ui/core";
import StyledSpinner from "../StyledComponent";
import validator from 'validator'
import { useHistory } from 'react-router';
import facebook from "../Image/facebook.jpg"
import tweeter from "../Image/tweet.jpg"
import instagram from "../Image/insta.jpg"
import youtube from "../Image/youtube.jpg"
import whtzup from "../Image/whtzup.jpg"
import mail from "../Image/gmail.jpg"
import snapchat from "../Image/snap.jpg"
import pinterest from "../Image/pint.jpg"
import defaultLogo from "../Image/defaultLogo.jpg"
import { getCategoryData, postAddBusinessData, getFrameData, getProfileType, getPoliticalType } from "../API";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Edit from "./Edit"
import Link from '@mui/material/Link';

import TextField from '@mui/material/TextField';


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



const AddBusiness = () => {

    const classes = useStyles();
    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const [sdata, setSdata] = useState([])
    const [addFlag, setAddFlag] = useState(false)
    const [addFlag2, setAddFlag2] = useState(false)
    const [loader, setLoader] = useState(false);
    const [iconshow, setIconshow] = useState(false);
    const [searchData, setSearchData] = useState(false)
    const [open1, setOpen1] = React.useState(false);
    const [partyOpen1, setPartyOpen1] = React.useState(false);
    const [frameshow, setFrameshow] = useState(false)
    const [loaderPage, setLoaderPage] = useState(false);
    const [framalert, setFramealert] = useState(false);

    const [img, setImg] = useState([])
    const [img2, setImg2] = useState([])
    const [catList, setCatList] = useState([]);
    const [fData, setFData] = useState([]);
    const [peopleInfo, setPeopleInfo] = useState([]);
    const [singleData, setSingleData] = useState([]);
    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [error, setError] = React.useState("");
    const [erroremail, setErroremail] = React.useState("");
    const [er, setEr] = useState(false)
    const [profileTypeData, setProfileTypeData] = useState([])
    const [politicalTypeData, setPoliticalTypeData] = useState([])


    const [openProfile, setOpenProfile] = React.useState(false);
    const handleProfiltTypeOpen = () => {
        setOpenProfile(true);
    }
    const handleProfiltTypeClose = () => {
        setOpenProfile(false);
    };

    useEffect(async () => {
        getApi()
    }, [])

    const getApi = async () => {
        const response = await getCategoryData()
        const response1 = await getProfileType()
        const response2 = await getPoliticalType()

        if (response1)
            setProfileTypeData(response1?.data)
        if (response)
            setCatList(response?.data);
        if (response2)
            setPoliticalTypeData(response2?.data)

    }

    const getDialog = (data) => {

        setCatiddata(data?.id)
        setCatname(data?.name)
        handleClose1();

    }

    const searchBank = (e) => {
        setSearchData(true);

        if (e.target.value === null) {
            setSearchData(false)
        }
        if (sName !== null) {
            const filtered = catList.filter((bank) => {
                return bank?.name.toLowerCase().includes(sName.toLowerCase());
            });
            setSName(e.target.value);
            setFilterData(filtered);
        }
    };



    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };


    const handleClickPartyOpen1 = () => {
        setPartyOpen1(true);
    };

    const handlePartyClose1 = () => {
        setPartyOpen1(false);
    };

    const [fcid, setFcid] = useState("")
    const [insid, setInsid] = useState("")
    const [desname, setDesname] = useState("");
    const [bname, setBname] = useState("");
    const [pospol, setPospol] = useState("");
    // const [fid, setFid] = useState("")
    // const [iid, setIid] = useState("")
    const [mobile, setMobile] = useState("");
    const [mobile2, setMobile2] = useState("");
    const [emailP, setEmailP] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState("");
    const [logo2, setLogo2] = useState("")
    const [yname, setYName] = useState("");
    const [catname, setCatname] = useState("");
    const [catiddata, setCatiddata] = useState("")
    const [profilename, setProfilename] = useState("");
    const [profileiddata, setProfileiddata] = useState("")
    const [partyname, setPartyname] = useState("");
    const [partyiddata, setPartyiddata] = useState("")


    let btnRef = useRef();
    let btnRef2 = useRef();
    let btnRef3 = useRef();
    let btnRef4 = useRef();
    let btnRef5 = useRef();
    let btnRef6 = useRef();
    let btnRef7 = useRef();
    let btnRef8 = useRef();
    const [cou, setCou] = useState(0);
    const [cou2, setCou2] = useState(0);
    const [cou3, setCou3] = useState(0);
    const [cou4, setCou4] = useState(0);
    const [cou5, setCou5] = useState(0);
    const [cou6, setCou6] = useState(0);
    const [cou7, setCou7] = useState(0);
    const [cou8, setCou8] = useState(0);


    const imgHandler = (e) => {

        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setLogo(fileArray[0])
            setImg((prevImages) => prevImages.concat(fileArray))
            Array.from(e.target.files).map((file) => (URL.revokeObjectURL(file)))
        }
    }

    const photos = (source) => {
        return source.map((photo) => {
            return <img src={photo}
                key={photo}
                style={{ marginBottom: "50px", height: "40px", width: "40px" }}
            />
        })
    }


    const imgHandler2 = (e) => {

        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setLogo2(fileArray[0])
            setImg2((prevImages) => prevImages.concat(fileArray))
            Array.from(e.target.files).map((file) => (URL.revokeObjectURL(file)))
        }
    }

    const photos2 = (source) => {
        return source.map((photo) => {
            return <img src={photo}
                key={photo}
                style={{ marginBottom: "50px", height: "40px", width: "40px" }}
            />
        })
    }

    const saveData = async () => {

        if (catname) {

            console.log("fbid,instid", fcid, insid)
            setLoader(true);
            setLoaderPage(true)

            const formData = new FormData();
            if (document.querySelector('input[type="file"]').files[0] == undefined) {

            }
            else {

                formData.append("logo", document.querySelector('input[type="file"]').files[0])
            }
            if (profileiddata == 3) {
                if (document.getElementById("file1").files[0] == undefined) {

                }
                else {

                    formData.append("business_image", document.getElementById("file1").files[0])
                }
            }

            if (profileiddata == 3) {
                formData.append("business_name", bname);
            }
            if (profileiddata == 4) {
                formData.append("business_name", partyname);
                formData.append("tagline", pospol);
            }
            if (profileiddata == 2) {
                formData.append("tagline", desname);
            }
            formData.append("category_id", catiddata);
            formData.append("name", yname);

            formData.append("email", emailP);
            formData.append("mobile_no", mobile);
            formData.append("mobile_no_2", mobile2);
            formData.append("website", website);
            formData.append("address", address);
            formData.append("name", yname);
            formData.append("frame_type_id", profileiddata);
            formData.append("political_party_id", partyiddata);
            formData.append("social_icones",
                JSON.stringify(
                    {
                        facebook: cou,
                        twitter: cou2,
                        instagram: cou3,
                        youtube: cou4,
                        whatsapp_no: cou5,
                        gmail: cou6,
                        snapchat: cou7,
                        pinterest: cou8,
                        facebookid: fcid,
                        instagramid: insid
                    }))

            const response1 = await postAddBusinessData(formData);
            console.log("add business", response1)
            setSingleData(response1?.data)

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
                
                if (response?.success) {
                    setLoaderPage(false)
                    setFData(response?.data)
                    history.push('/frame', {
                        name: response.data, data: response1.data
                    })

                }
            }
            setFrameshow(true)

        }
        else {
            setEr(true)
            alert("Plz choose category ")

        }

    }

    const onBtnClick = (e) => {

        if (btnRef.current.value == 0) {
            setCou(1);
            btnRef.current.disabled = true;

        }
        if (btnRef.current.value == 1) {
            setCou(0);
            btnRef.current.disabled = false;
        }
    };
    const onBtnClick2 = (e) => {

        if (btnRef2.current.value == 0) {
            setCou2(1);
            btnRef2.current.disabled = true;

        }
        if (btnRef2.current.value == 1) {
            setCou2(0);
            btnRef2.current.disabled = false;
        }
    };

    const onBtnClick3 = (e) => {

        if (btnRef3.current.value == 0) {
            setCou3(1);
            btnRef3.current.disabled = true;

        }
        if (btnRef3.current.value == 1) {
            setCou3(0);
            btnRef3.current.disabled = false;
        }
    };
    const onBtnClick4 = (e) => {

        if (btnRef4.current.value == 0) {
            setCou4(1);
            btnRef4.current.disabled = true;

        }
        if (btnRef4.current.value == 1) {
            setCou4(0);
            btnRef4.current.disabled = false;
        }
    };
    const onBtnClick5 = (e) => {

        if (btnRef5.current.value == 0) {
            setCou5(1);
            btnRef5.current.disabled = true;

        }
        if (btnRef5.current.value == 1) {
            setCou5(0);
            btnRef5.current.disabled = false;
        }
    };
    const onBtnClick6 = (e) => {

        if (btnRef6.current.value == 0) {
            setCou6(1);
            btnRef6.current.disabled = true;

        }
        if (btnRef6.current.value == 1) {
            setCou6(0);
            btnRef6.current.disabled = false;
        }
    };
    const onBtnClick7 = (e) => {

        if (btnRef7.current.value == 0) {
            setCou7(1);
            btnRef7.current.disabled = true;

        }
        if (btnRef7.current.value == 1) {
            setCou7(0);
            btnRef7.current.disabled = false;
        }
    };
    const onBtnClick8 = (e) => {

        if (btnRef8.current.value == 0) {
            setCou8(1);
            btnRef8.current.disabled = true;

        }
        if (btnRef8.current.value == 1) {
            setCou8(0);
            btnRef8.current.disabled = false;
        }
    };

    return (
        <>
            <div className="account-main">
                <Account />
                <div className="ac-right">
                    <div className="add-business">
                        <h1>Add Business</h1>
                    </div>

                    <div>
                        {addFlag ?

                            <>
                                <div className="upload-field">
                                    <div className="result"
                                        onClick={(e) => {
                                            setLogo(e.target.src)
                                            e.preventDefault();

                                        }}>
                                        {img.length > 0
                                            ?
                                            photos(img) :
                                            (
                                                <img src={defaultLogo} />
                                            )
                                        }
                                    </div>

                                    <div className="upload-lable">
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            onChange={imgHandler}
                                            className={classes.inputfile}
                                        />
                                        <label for="file">
                                            Upload Logo
                                        </label>
                                    </div>
                                </div>

                                <div className="business-cat-list">
                                    <Link variant="outlined" onClick={handleClickOpen1} >
                                        {catname ? catname :
                                            <div className="cat-name">
                                                Select Business Category
                                                <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                            </div>
                                        }
                                    </Link>
                                    <Link variant="outlined" onClick={handleProfiltTypeOpen}>
                                        {profilename ? profilename :
                                            <div className="cat-name">
                                                Profile Type
                                                <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                            </div>
                                        }
                                    </Link>
                                </div>

                                {/* Business Field start */}
                                <div className="business-field">
                                    <div className="row">
                                        <div className={profileiddata == 4 ? "col-md-12" : "col-md-6"}>
                                            <TextField id="standard-basic"
                                                label="Your Name"
                                                variant="standard"
                                                value={yname}
                                                onChange={(e) => {
                                                    setYName(e.target.value)
                                                    //   setBlankMsg("")
                                                }} />
                                        </div>


                                        {profileiddata !== 4 ?
                                            <div className="col-md-6">
                                                <TextField id="standard-basic"
                                                    label="Email"
                                                    variant="standard"
                                                    value={emailP}
                                                    onChange={(e) => {
                                                        var email = e.target.value

                                                        if (validator.isEmail(email)) {
                                                            setErroremail('  ')
                                                        } else {
                                                            setErroremail('Enter valid Email!')
                                                        }

                                                        setEmailP(e.target.value)

                                                    }} />
                                            </div>
                                            : ""}

                                        {profileiddata == 2 ?
                                            <div className="col-md-12">
                                                <TextField id="standard-basic"
                                                    label=" Designation(Position)"
                                                    variant="standard"
                                                    value={desname}
                                                    onChange={(e) => {
                                                        setDesname(e.target.value)
                                                    }} />
                                            </div>
                                            : ""}

                                        {profileiddata === 3 ?
                                            <>
                                                <div className="col-md-6">
                                                    <TextField id="standard-basic"
                                                        label=" Business Name"
                                                        variant="standard"
                                                        value={bname}
                                                        onChange={(e) => {
                                                            setBname(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="col-md-6">
                                                    <TextField id="standard-basic"
                                                        label="Website"
                                                        variant="standard"
                                                        value={website}
                                                        onChange={(e) => {
                                                            setWebsite(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <TextField
                                                        label="Address"
                                                        variant="standard"
                                                        aria-label="minimum height"
                                                        multiline
                                                        rows={3}
                                                        value={address}
                                                        onChange={(e) => {
                                                            setAddress(e.target.value)
                                                            //setBlankMsg("")
                                                        }} />
                                                </div>

                                            </> : ""}

                                        {profileiddata !== 4 ?
                                            <div className={profileiddata == 3 ? "col-md-6" : "col-md-12"}>
                                                <TextField id="standard-basic"
                                                    label="Mobile Number"
                                                    variant="standard"
                                                    value={mobile}
                                                    onChange={(e) => {
                                                        const reg = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
                                                        let preval = e.target.value
                                                        if (e.target.value === '' || reg.test(e.target.value)) {
                                                            setError("  ")
                                                        }
                                                        else {
                                                            e.target.value = preval.substring(0, (preval.length - 1))
                                                            setError("Plz Enter only Number")
                                                        }
                                                        setMobile(e.target.value)
                                                    }} />
                                            </div>
                                            : ""}

                                        {profileiddata === 3 ?
                                            <div className="col-md-6">
                                                <TextField id="standard-basic"
                                                    label="Mobile Number2"
                                                    variant="standard"
                                                    value={mobile2}
                                                    onChange={(e) => {
                                                        const reg = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
                                                        let preval = e.target.value
                                                        if (e.target.value.length > 10) {
                                                            setError("Enter only 10 Number")
                                                        }
                                                        else if (e.target.value === '' || reg.test(e.target.value)) {
                                                            setError("  ")
                                                        }
                                                        else {
                                                            e.target.value = preval.substring(0, (preval.length - 1))
                                                            setError("Plz Enter only Number")
                                                        }

                                                        setMobile2(e.target.value)

                                                    }} />
                                            </div>
                                            : ""}
                                    </div>
                                </div>


                                {profileiddata === 4 ? " " : <>
                                    <div className="business-social-media">
                                        <h5>Select Social Media</h5>
                                        <div className="social-list">
                                            <button value={cou} ref={btnRef} onClick={onBtnClick}
                                                style={{
                                                    border: cou == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou == 1 ? "#084277" : " "
                                                }}>
                                                <img alt="facebook" src={facebook} />
                                            </button>

                                            <button value={cou2} ref={btnRef2} onClick={onBtnClick2}
                                                style={{
                                                    border: cou2 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou2 == 1 ? "#084277" : " "
                                                }}>
                                                <img alt="tweeter" src={tweeter} />
                                            </button>

                                            <button value={cou3} ref={btnRef3} onClick={onBtnClick3}
                                                style={{
                                                    border: cou3 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou3 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={instagram} />
                                            </button>

                                            <button value={cou4} ref={btnRef4} onClick={onBtnClick4}
                                                style={{
                                                    border: cou4 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou4 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={youtube} />
                                            </button>

                                            <button value={cou5} ref={btnRef5} onClick={onBtnClick5}
                                                style={{
                                                    border: cou5 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou5 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={whtzup} />
                                            </button>

                                            <button value={cou6} ref={btnRef6} onClick={onBtnClick6}
                                                style={{
                                                    border: cou6 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou6 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={mail} />
                                            </button>

                                            <button value={cou7} ref={btnRef7} onClick={onBtnClick7}
                                                style={{
                                                    border: cou7 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou7 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={snapchat} />
                                            </button>

                                            <button value={cou8} ref={btnRef8} onClick={onBtnClick8}
                                                style={{
                                                    border: cou8 == 1 ? "solid" : " ",
                                                    borderWidth: cou == 1 ? "2px" : " ",
                                                    borderColor: cou8 == 1 ? "#084277" : " "
                                                }}>
                                                <img src={pinterest} />
                                            </button>
                                        </div>
                                    </div>
                                </>}

                                {profileiddata === 3 ?
                                    <div
                                        style={{
                                            marginTop: "30px",
                                            marginBottom: "0px"
                                        }}
                                        className="upload-field">
                                        <div
                                            className="result"
                                            onClick={(e) => {
                                                setLogo2(e.target.src)
                                                e.preventDefault();

                                            }}>
                                            {img2.length > 0
                                                ?
                                                photos2(img2) :
                                                (
                                                    <img src={defaultLogo}
                                                    /* src={(editmode) ?
                                                            records.logo ?
                                                                records.logo
                                                                :
                                                                defaultLogo
                                                            :
                                                            defaultLogo
                                                        }*/
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className="upload-lable">
                                            <input
                                                type="file"
                                                name="file1"
                                                id="file1"
                                                onChange={imgHandler2}
                                                className={classes.inputfile}
                                            />
                                            <label for="file1">
                                                Business Image Upload
                                            </label>
                                        </div>
                                    </div>
                                    : ""}

                                {profileiddata === 4 ?
                                    <>
                                        <div className="business-cat-list" style={{ marginTop: "30px" }}>
                                            <Link variant="outlined" onClick={handleClickPartyOpen1}>
                                                {partyname ? partyname :
                                                    <div className="cat-name">
                                                        Party Name
                                                        <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                                    </div>
                                                }
                                            </Link>
                                        </div>

                                        <div className="business-field">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <TextField id="standard-basic"
                                                        label=" Position in party"
                                                        variant="standard"
                                                        value={pospol}
                                                        onChange={(e) => {
                                                            setPospol(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <TextField id="standard-basic"
                                                        label="Fb id"
                                                        variant="standard"
                                                        value={fcid}
                                                        onChange={(e) => {
                                                            setFcid(e.target.value)
                                                        }} />
                                                </div>
                                                <div className="col-md-12">
                                                    <TextField id="standard-basic"
                                                        label="Insta id"
                                                        variant="standard"
                                                        value={insid}
                                                        onChange={(e) => {
                                                            setInsid(e.target.value)
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : ""}
                                <Button size="large"
                                    variant="contained"
                                    className='business-next-btn'
                                    onClick={saveData}
                                    disabled={loaderPage}
                                >
                                    {loaderPage === true ? "please wait ..." : " Next"}
                                </Button>
                            </>

                            : <>
                                <div className="business-cat-list">
                                    <Link onClick={handleClickOpen1}>
                                        {catname ? catname :
                                            <div className="cat-name">
                                                Select Business Category
                                                <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                            </div>
                                        }
                                    </Link>

                                    <Link onClick={handleProfiltTypeOpen}>
                                        {
                                            <div className="cat-name">
                                                Profile Type
                                                <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                            </div>
                                        }
                                    </Link>

                                    {/* <Button
                                variant="outlined"
                                style={{
                                    justifyContent: "left",
                                    height: "40px",
                                    color: "darkblue",
                                    borderColor: "skyblue",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    width: "60%",
                                    marginTop: "30px"
                                }}
                                onClick={handleClickOpen1}
                            >
                                {catname ? catname :
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "98%", alignItems: "center" }}>
                                        <span style={{ backgroundColor: "white" }}>
                                            Select Business Category
                                        </span>
                                        <img
                                            src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg"
                                            style={{
                                                height: "15px",
                                                width: "15px",
                                                marginLeft: "230px"
                                            }} />
                                    </div>

                                }
                            </Button> */}

                                    {/* <Button
                                variant="outlined"
                                style={{
                                    justifyContent: "left",
                                    height: "40px",
                                    color: "darkblue",
                                    borderColor: "skyblue",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    width: "60%",
                                    marginTop: "15px"
                                }}
                                onClick={handleProfiltTypeOpen}
                            >
                                {


                                    <div style={{ display: "flex", justifyContent: "space-between", width: "98%", alignItems: "center" }}>

                                        <span style={{ backgroundColor: "white" }}>
                                            Profile Type
                                        </span>
                                        <img
                                            src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg"
                                            style={{
                                                height: "15px",
                                                width: "15px",
                                                marginLeft: "330px"
                                            }} />
                                    </div>
                                }
                            </Button> */}
                                </div>

                            </>}
                    </div>



                    {/* Dialog */}

                    <Dialog open={partyOpen1}
                    // onClose={handleProfiltTypeClose}
                    >
                        <div className="login-modal">
                            <h2>Select Party</h2>

                            <div className="profile-button">
                                {politicalTypeData ? politicalTypeData?.length > 0 ?
                                    politicalTypeData.map((item) => {
                                        return (
                                            <Button
                                                onClick={() => {
                                                    //    setAddBusiFlag(false)
                                                    setPartyname(item?.name)
                                                    setPartyiddata(item?.id)
                                                    handlePartyClose1()
                                                }}
                                                variant="outlined"
                                                className='politic-btn'
                                            >
                                                <img src={item?.logo} style={{ height: "20px" }} />
                                                {item?.name}

                                            </Button>
                                        )
                                    })
                                    : ""
                                    : ""}

                            </div>
                        </div>
                    </Dialog>

                    <Dialog open={openProfile}
                    // onClose={handleProfiltTypeClose}
                    >
                        <div className="login-modal">
                            <h2>Select Profile</h2>
                            <p>
                                select profile type
                                {//JSON.parse(localStorage.getItem("LanguageData"))?.app_business_type_sub
                                }</p>

                            <div className="profile-button">
                                {profileTypeData ? profileTypeData?.length > 0 ?
                                    profileTypeData.map((item) => {
                                        return (
                                            <Button
                                                onClick={() => {
                                                    setAddFlag(true)
                                                    setProfilename(item?.name)
                                                    setProfileiddata(item?.id)
                                                    handleProfiltTypeClose()
                                                }}
                                                variant="contained"
                                                className='profile-btn'
                                            >{item?.name}
                                                <img src={item?.image} style={{ height: "20px" }} />
                                            </Button>
                                        )
                                    })
                                    : ""
                                    : ""}

                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        open={open1}
                        className="business-cat-dialog">
                        <h3>select business castegory
                            {//JSON.parse(localStorage.getItem("LanguageData"))?.business_category_subtitle1
                            }
                        </h3>
                        {/* <DialogTitle style={{
                    cursor: 'move',
                    textAlign: "left",
                    paddingTop: "10px",
                    paddingLeft: "50px",
                    height: "50px",
                    textTransform: "none"
                }}
                    id="draggable-dialog-title">
                    <font
                        size="5"
                        color="darkblue">
                        {JSON.parse(localStorage.getItem("LanguageData"))?.business_category_subtitle1}
                    </font>

                </DialogTitle> */}

                        <div className="search-business">
                            <input
                                type="text"
                                placeholder="Search Business Category"//{JSON.parse(localStorage.getItem("LanguageData"))?.business_category_search_hint}
                                className="form-control"
                                name="sName"
                                value={sName}
                                onChange={(e) => searchBank(e)}
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

                        <DialogContent>
                            <DialogContentText className="ab-img-gallery">
                                <ImageList
                                    cols={4}
                                    rowHeight={110}
                                >

                                    {searchData === false ? (
                                        <>
                                            {
                                                catList.length > 0 ?
                                                    catList.map((item, key) => {
                                                        return (
                                                            <ImageListItem
                                                                key={item?.name}
                                                                style={{
                                                                    //  height: "100%",
                                                                    position: "relative",
                                                                    overflow: "hidden"
                                                                }}>
                                                                <div style={{ display: loading ? "block" : "none" }}>
                                                                    <StyledSpinner size={50} />
                                                                </div>
                                                                <img
                                                                    onClick={() => getDialog(item)}
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "10px",
                                                                        height: "100px",
                                                                        width: "100%",
                                                                        cursor: "pointer",
                                                                        display: loading ? "none" : "block"
                                                                    }}
                                                                    onLoad={() => setLoading(false)}
                                                                    referrerPolicy="no-referrer"
                                                                    src={item?.image}
                                                                    alt="background" />

                                                                <span style={{
                                                                    color: "white",
                                                                    textAlign: "center",
                                                                    position: "absolute",
                                                                    top: "78px",
                                                                    left: "2px",
                                                                    right: 0,
                                                                    width: item?.name?.length > 10 ? "250px" : "80px",
                                                                    fontWeight: "bold",
                                                                    fontSize: "13px",
                                                                    overflowX: "hidden",
                                                                    height: "fit-content",
                                                                    margin: "auto",
                                                                }}>
                                                                    {item?.name?.length > 10 ?
                                                                        <div className="target2" >
                                                                            {item?.name}</div>
                                                                        : item?.name}
                                                                </span>
                                                            </ImageListItem>

                                                        )
                                                    })

                                                    : <>
                                                        data not found
                                                    </>
                                            }
                                        </>) : (
                                        <>
                                            {filterData?.length > 0 ? (
                                                filterData?.map((item) => {
                                                    return (
                                                        <>
                                                            <ImageListItem key={item?.name}

                                                                style={{
                                                                    position: "relative",
                                                                    overflow: "hidden"
                                                                }}>
                                                                <img
                                                                    onClick={() => getDialog(item)}
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "20px",
                                                                        height: "100px",
                                                                        width: "100px",
                                                                        margin: "5px",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    src={item?.image}
                                                                    alt="background" />

                                                                <span style={{
                                                                    color: "white",
                                                                    textAlign: "center",
                                                                    position: "absolute",
                                                                    top: "70px",
                                                                    left: "2px",
                                                                    right: 0,
                                                                    fontSize: "15px",
                                                                    height: "fit-content",

                                                                    margin: "auto",
                                                                }}>
                                                                    <strong>
                                                                        {item?.name}
                                                                    </strong>
                                                                </span>
                                                            </ImageListItem>
                                                        </>
                                                    )
                                                })) :
                                                <>
                                                    data not found
                                                </>
                                            }
                                        </>)

                                    }
                                </ImageList>

                            </DialogContentText>
                        </DialogContent>

                        <DialogActions style={{
                            justifyContent: "center",
                            paddingTop: "20px"
                        }}>

                            <Button autoFocus
                                variant="contained"
                                style={{
                                    backgroundColor: "darkBlue",
                                    color: "white",
                                    textTransform: "none"
                                }}
                                onClick={handleClose1}>
                                Back
                            </Button>

                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default AddBusiness;