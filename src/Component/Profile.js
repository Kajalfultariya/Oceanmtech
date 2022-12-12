import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Account from "./Account"
import Stack from '@mui/material/Stack';
//import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { TimePicker } from '@mui/x-date-pickers/TimePicker';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from "@material-ui/core/Input";
//import MenuItem from "@material-ui/core/MenuItem";
//import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Label } from "reactstrap";
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Link from '@mui/material/Link';

import {
    getReligionData,
    getLanguageData,
    getCountryData,
    getStateData,
    getuserLang,
    getCityData,
    postAddProfileData,

    getProfileData,
    PostDelLogo
} from "../API";
import { textAlign } from "@mui/system";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null,
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            // left:10
        }
    },
    disableScrollLock: true
};


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

const Profile = () => {

    const [openF, setOpenF] = React.useState(false);
    const [addchild, setAddchild] = useState(false);
    const [addchild3, setAddchild3] = useState(false);
    const [addchild4, setAddchild4] = useState(false);
    const [addchild5, setAddchild5] = useState(false);
    const [addbrother, setAddbrother] = useState(false);
    const [addbrother2, setAddbrother2] = useState(false);
    const [addbrother3, setAddbrother3] = useState(false);
    const [addbrother4, setAddbrother4] = useState(false);
    const [addbrother5, setAddbrother5] = useState(false);
    const [addsister, setAddsister] = useState(false);
    const [addsister2, setAddsister2] = useState(false);
    const [addsister3, setAddsister3] = useState(false);
    const [addsister4, setAddsister4] = useState(false);
    const [addsister5, setAddsister5] = useState(false);


    const [re, setRe] = React.useState('');
    const [ln, setLn] = React.useState('');
    const [sn, setSn] = React.useState([]);
    const [cn, setCn] = React.useState('');
    const [cin, setCin] = React.useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [cData, setCData] = useState([]);
    const [rData, setRData] = useState([]);
    const [lData, setLData] = useState([]);
    const [sData, setSData] = useState([]);
    const [ciData, setCiData] = useState([]);
    const [lanId, setLanId] = useState(" ")
    const [RelId, setRelId] = useState(" ")
    const [counId, setCounId] = useState(null)
    const [stateId, setStateId] = useState(null)
    const [cityId, setCityId] = useState(" ")
    const [name, setName] = useState(" ")
    const [mobileno, setMobileno] = useState(" ")
    const [email, setEmail] = useState(" ")
    const [dob, setDob] = useState(' ')
    const [AnnDate, setAnnDate] = useState(' ')
    const [logo, setLogo] = useState("")

    const [img, setImg] = useState([])
    const [fathername, setFathername] = useState("")
    const [mothername, setMothername] = useState("")
    const [spouseiname, setSpouseiname] = useState("")
    const [childname, setChildname] = useState([])
    const [childname2, setChildname2] = useState("")
    const [childname3, setChildname3] = useState("")
    const [childname4, setChildname4] = useState("")
    const [childname5, setChildname5] = useState("")
    const [childrens, setChildrens] = useState([])

    const [brothername, setBrothername] = useState([])
    const [brothername2, setBrothername2] = useState("")
    const [brothername3, setBrothername3] = useState("")
    const [brothername4, setBrothername4] = useState("")
    const [brothername5, setBrothername5] = useState("")
    const [brothers, setBrothers] = useState([])

    const [sistername, setSistername] = useState([])
    const [sistername2, setSistername2] = useState("")
    const [sistername3, setSistername3] = useState("")
    const [sistername4, setSistername4] = useState("")
    const [sistername5, setSistername5] = useState("")
    const [sisters, setSisters] = useState([])

    useEffect(() => {
        fetchReligionData();
        fetchCountryData();
        fetchLanguageData();
        fetchProfile();
    }, []);

    useEffect(() => {
        fetchStateData();
    }, [counId])

    useEffect(() => {
        fetchCityData();
    }, [stateId])

    const fetchProfile = async () => {
        const response = await getProfileData();
        // console.log("get Profile data", response?.data)

        if (response?.data) {
            setLogo(response?.data?.logo)
            setName(response?.data?.name)
            setMobileno(response?.data?.mobile_no)
            setEmail(response?.data?.email)
            setDob(response?.data?.date_of_birth)
            setFd(response?.data?.date_of_birth)
            // setStartDate(response?.data?.date_of_birth)
            setAnnDate(response?.data?.anniversary_date)
            setFa(response?.data?.anniversary_date)

            if (response?.data?.user_language_name) {
                setLanId(response?.data?.user_language_id)
                setLn(response?.data?.user_language_id)
            }
            if (response?.data?.religion_name) {
                setRelId(response?.data?.religion_id)
                setRe(response?.data?.religion_id)
            }

            if (response?.data?.country_name) {
                setCounId(response?.data?.country_id)
                setCn(response?.data?.country_id)
            }
            if (response?.data?.state_name) {
                setStateId(response?.data?.state_id)
                setSn(response?.data?.state_id)
            }
            if (response?.data?.city_name) {
                setCityId(response?.data?.city_id)
                setCin(response?.data?.city_id)
            }

            setSelectedValue(response?.data?.gender)

            setFathername(response?.data?.father_name)
            setMothername(response?.data?.mother_name)
            setSpouseiname(response?.data?.spouse_name)


            if (response?.data?.children[0])
                setChildname(response?.data?.children[0]?.name)
            if (response?.data?.children[1])
                setChildname2(response?.data?.children[1]?.name)
            if (response?.data?.children[2])
                setChildname3(response?.data?.children[2]?.name)
            if (response?.data?.children[3])
                setChildname4(response?.data?.children[3]?.name)
            if (response?.data?.children[4])
                setChildname5(response?.data?.children[4]?.name)

            if (response?.data?.brother[0])
                setBrothername(response?.data?.brother[0]?.name)
            if (response?.data?.brother[1])
                setBrothername2(response?.data?.brother[1]?.name)
            if (response?.data?.brother[2])
                setBrothername3(response?.data?.brother[2]?.name)
            if (response?.data?.brother[3])
                setBrothername4(response?.data?.brother[3]?.name)
            if (response?.data?.brother[4])
                setBrothername5(response?.data?.brother[4]?.name)


            if (response?.data?.sister[0])
                setSistername(response?.data?.sister[0]?.name)
            if (response?.data?.sister[1])
                setSistername2(response?.data?.sister[1]?.name)
            if (response?.data?.sister[2])
                setSistername3(response?.data?.sister[2]?.name)
            if (response?.data?.sister[3])
                setSistername4(response?.data?.sister[3]?.name)
            if (response?.data?.sister[4])
                setSistername5(response?.data?.sister[4]?.name)
        }
    }
    const fetchReligionData = async () => {
        const response = await getReligionData();
        setRData(response?.data)
        // console.log("Religion", response?.data)
    };

    const fetchCountryData = async () => {
        const response = await getCountryData();
        setCData(response?.data)
        // console.log("Country", response?.data)
    };
    const fetchStateData = async () => {
        console.log("countID", counId)
        if (counId != null) {
            const response = await getStateData(counId);
            setSData(response?.data)
            //  console.log("State", response?.data)
        }
    };
    const fetchCityData = async () => {
        if (stateId != null) {
            const response = await getCityData(stateId);
            setCiData(response?.data)
            //console.log("City", response?.data)
        }
    };

    const fetchLanguageData = async () => {
        //   const response = await getLanguageData();
        const response = await getuserLang(JSON.parse(localStorage.getItem("id")), "Post", "Image")
        setLData(response?.data)

    };



    const handleClickOpenFamily = () => {
        setOpenF(true);
    };

    const handleCloseFamily = () => {
        childrens.push({ "name": childname })
        if (addchild) {
            childrens.push({ "name": childname2 })
        }
        if (addchild3) {
            childrens.push({ "name": childname3 })
        }
        if (addchild4) {
            childrens.push({ "name": childname4 })
        }
        if (addchild5) {
            childrens.push({ "name": childname5 })
        }

        brothers.push({ "name": brothername })
        if (addbrother) {
            brothers.push({ "name": brothername2 })
        }
        if (addbrother3) {
            brothers.push({ "name": brothername3 })
        }
        if (addbrother4) {
            brothers.push({ "name": brothername4 })
        }
        if (addbrother5) {
            brothers.push({ "name": brothername5 })
        }
        sisters.push({ "name": sistername })
        if (addsister) {
            sisters.push({ "name": sistername2 })
        }
        if (addsister3) {
            sisters.push({ "name": sistername3 })
        }
        if (addsister4) {
            sisters.push({ "name": sistername4 })
        }
        if (addsister5) {
            sisters.push({ "name": sistername5 })
        }

        setOpenF(false);
    };


    const [fd, setFd] = useState('')

    const [fa, setFa] = useState('')
    const handleChange1 = (newValue) => {
        var f = newValue.$M + 1

        setFd(newValue.$y + "-" + f + "-" + newValue.$D)


        setDob(newValue);
    };


    const handleChange2 = (newValue) => {
        var f = newValue.$M + 1
        setFa(newValue.$y + "-" + f + "-" + newValue.$D)
        setAnnDate(newValue);
        console.log("ann data", newValue)
    };

    const [selectedValue, setSelectedValue] = React.useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const imgHandler = (e) => {

        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setImg((prevImages) => prevImages.concat(fileArray))
            Array.from(e.target.files).map((file) => (URL.revokeObjectURL(file)))
        }
    }

    const handleSubmit = async () => {
        var imagedata = document.querySelector('input[type="file"]').files[0];

        const formData = new FormData();
        if (imagedata == undefined) {
        }
        else {
            formData.append("logo", imagedata)
        }

        formData.append("name", name);
        formData.append("email", email)
        formData.append("date_of_birth", fd)
        formData.append("anniversary_date", fa);
        formData.append("mobile_no", mobileno);
        formData.append("gender", selectedValue)
        formData.append("country_id", cn)
        formData.append("user_language_id", ln)
        formData.append("religion_id", re)
        formData.append("state_id", sn)
        formData.append("city_id", cin)
        formData.append("father_name", fathername)
        formData.append("mother_name", mothername)
        formData.append("spouse_name", spouseiname)
        formData.append("children_json", JSON.stringify(childrens))
        formData.append("brother_json", JSON.stringify(brothers))
        formData.append("sister_json", JSON.stringify(sisters))

        const response = await postAddProfileData(formData);
        console.log("response Profile data", response.data)
        if (response?.success)
            window.location.href = "/profile"

    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const photos = (source) => {
        return source.map((photo) => {
            return <Avatar alt="Remy Sharp"
                src={photo}
                key={photo}
                sx={{ width: 50, height: 50 }}
                style={{
                    marginLeft: "30px",
                    border: "solid",

                }}
            />
        })
    }

    const [sName, setSName] = useState("");
    const [filterData, setFilterData] = useState("");
    const [searchData, setSearchData] = useState(false)
    const [sName1, setSName1] = useState("");
    const [filterData1, setFilterData1] = useState("");
    const [searchData1, setSearchData1] = useState(false)

    const searchState = (e) => {
        setSearchData(true);

        if (e.target.value === null) {
            //          console.log("show all")
            setSearchData(false)
        }
        if (sName !== null) {
            const filtered = sData.filter((state) => {
                return state?.name.toLowerCase().includes(sName.toLowerCase());
            });
            setSName(e.target.value);
            setFilterData(filtered);
        }
    };

    const searchCity = (e) => {
        setSearchData1(true);

        if (e.target.value === null) {
            //          console.log("show all")
            setSearchData1(false)
        }
        if (sName1 !== null) {
            const filtered = ciData.filter((city) => {
                return city?.name.toLowerCase().includes(sName1.toLowerCase());
            });
            setSName1(e.target.value);
            setFilterData1(filtered);
        }
    };
    const classes = useStyles();
    return (
        <> <div className="account-main">
            <Account />
            <div className="ac-right">

                <div>
                    <div className="profile-header">
                        <h1>Update Profile</h1>
                    </div>

                    <div className="profile-edit-group">
                        <div className="upload-field" onClick={imgHandler}>
                            <div className="result">
                                {
                                    img.length > 0
                                        ?
                                        photos(img) :
                                        <img
                                            referrerPolicy="no-referrer"
                                            srcSet={logo}
                                        // crossOrigin="Anonymous"
                                        />}
                            </div>
                            <div className="upload-lable">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={imgHandler}
                                    className={classes.inputfile}
                                />
                                <Label for="file" >
                                    Change Logo
                                </Label>
                            </div>
                        </div>
                        {logo ||   img.length > 0 ? <Button onClick={async () => {
                            const res = await PostDelLogo()
                            if (res.success === true) {
                                window.location.reload();
                            }
                        }}>
                            Delete Logo
                        </Button> : " "}
                        <div className="business-field">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormControl variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Select Language
                                        </InputLabel>
                                        <Select
                                            //    input={<Input />}
                                            MenuProps={MenuProps}

                                            labelId="demo-simple-select-standard-label"
                                            value={ln}
                                            label="Age"

                                            onChange={(e) => {
                                                setLn(e.target.value)
                                            }}>



                                            {lData.length > 0 ?
                                                lData?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-6">
                                    <FormControl variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Select Religion
                                        </InputLabel>
                                        <Select
                                            //   input={<Input />}
                                            MenuProps={MenuProps}

                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select"
                                            value={re}
                                            onChange={(event) => {
                                                setRe(event.target.value)
                                            }}>
                                            {rData.length > 0 ?
                                                rData?.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-12">
                                    <TextField
                                        id="filled-basic"
                                        label="Your Name"
                                        variant="standard"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextField
                                        id="filled-basic"
                                        label="Your Mobile Number"
                                        variant="standard"
                                        value={mobileno}
                                        onChange={(e) => {
                                            setMobileno(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextField
                                        id="filled-basic"
                                        label="Email"
                                        variant="standard"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>

                                <div className="col-md-6 dp-style">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Date Of Birth"
                                                inputFormat="MM/DD/YYYY"
                                                value={dob}
                                                onChange={handleChange1}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </div>
                                <div className="col-md-6 dp-style">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Anniversary Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={AnnDate}
                                                onChange={handleChange2}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>

                                </div>

                                <div className="col-md-12">
                                    <FormControl variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Select Country
                                        </InputLabel>
                                        <Select
                                            // input={<Input />}
                                            MenuProps={MenuProps}

                                            labelId="demo-simple-select-standard-label"
                                            value={cn}
                                            label="Select Country"
                                            onChange={(e) => {
                                                setCounId(e.target.value)
                                                setCn(e.target.value)
                                            }}
                                        >
                                            {cData.length > 0 ?
                                                cData?.map((item, index) => {

                                                    return (

                                                        <MenuItem value={item?.id}>
                                                            <img
                                                                src=
                                                                "https://media.istockphoto.com/photos/indian-flag-badge-picture-id495617382?k=20&m=495617382&s=612x612&w=0&h=19bql2Euoq_JELDmJ2zrxQHrD3eidNHMHWdXacUNmKM="
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                    borderRadius: "50%",
                                                                    border: "1px solid grey",
                                                                    marginRight: "20px"
                                                                }}
                                                            />
                                                            <span>
                                                                {item?.name}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: "15",
                                                                    marginLeft: "20px"
                                                                }}>
                                                                +{item?.code}
                                                            </span>
                                                        </MenuItem>
                                                    )
                                                })
                                                : <></>
                                            }

                                        </Select>
                                    </FormControl>
                                </div>


                                <div className="col-md-6">


                                    <FormControl variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Select State
                                        </InputLabel>
                                        <Select
                                            // input={<Input />}
                                            MenuProps={MenuProps}


                                            labelId="demo-simple-select-standard-label"
                                            value={sn}
                                            label="Age"
                                            onChange={(e) => {
                                                setStateId(e.target.value)
                                                setSn(e.target.value)
                                            }}
                                        >
                                            {counId
                                                ? sData.length > 0 ?
                                                    sData?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item?.id}>
                                                                {item?.name}
                                                            </MenuItem>
                                                        )
                                                    })
                                                    : <></>
                                                : <>Please Select Country</>
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-6">
                                    <FormControl variant="standard">
                                        <InputLabel id="demo-simple-select-standard-label">
                                            Select City
                                        </InputLabel>
                                        <Select
                                            //input={<Input />}
                                            MenuProps={MenuProps}

                                            value={cin}
                                            label="Select City"
                                            onChange={(e) => {
                                                setCin(e.target.value)
                                            }}
                                        >
                                            {stateId
                                                ? ciData.length > 0 ?
                                                    ciData?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item?.id}>
                                                                {item?.name}
                                                            </MenuItem>
                                                        )
                                                    })
                                                    : <></>
                                                : <>Please Select State</>
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-12 gender-button">
                                    <FormLabel id="demo-row-radio-buttons-group-label">Select Gender</FormLabel>
                                    <RadioGroup row>
                                        <FormControlLabel value="male"
                                            control=
                                            {
                                                <Radio
                                                    {...controlProps('Male')}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 28,
                                                        },
                                                    }}
                                                />
                                            }
                                            label={"Male"}
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio
                                                {...controlProps('Female')}
                                                sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {

                                                        color: pink[600],
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 28,
                                                    }
                                                }}
                                            />}
                                            label={"Female"}
                                        />
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        <div className="business-cat-list">
                            <Link
                                id="filled-basic"
                                variant="contained"
                                onClick={handleClickOpenFamily}
                            >
                                <div className="cat-name">
                                    Family Members
                                    <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/down-arrow_zJTVqILO_thumb.jpg" />
                                </div>
                            </Link>
                        </div>

                    </div>

                    <Dialog
                        fullScreen={fullScreen}
                        open={openF}
                        //  onClose={handleCloseFamily}
                        // aria-labelledby="responsive-dialog-title"
                        className="fm-groups"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <h2>Family Members</h2>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                <div className="business-field">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <TextField
                                                id="filled-basic"
                                                label="Father Name"
                                                variant="standard"
                                                value={fathername}
                                                onChange={(e) => {
                                                    setFathername(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <TextField
                                                id="filled-basic"
                                                label="Mother Name"
                                                variant="standard"
                                                value={mothername}
                                                onChange={(e) => {
                                                    setMothername(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <TextField
                                                id="filled-basic"
                                                label="Spouse Name"
                                                variant="standard"
                                                value={spouseiname}
                                                onChange={(e) => {
                                                    setSpouseiname(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ position: "relative" }}>
                                            <TextField
                                                id="filled-basic"
                                                label="Child Name"
                                                variant="standard"
                                                value={childname}
                                                onChange={(e) => {
                                                    setChildname(e.target.value)
                                                }}
                                            />
                                            {addchild || childname2
                                                ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Child Name"
                                                    variant="standard"
                                                    value={childname2}
                                                    onChange={(e) => {
                                                        setChildname2(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addchild3 || childname3 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Child Name"
                                                    variant="standard"
                                                    value={childname3}
                                                    onChange={(e) => {
                                                        setChildname3(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addchild4 || childname4 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Child Name"
                                                    variant="standard"
                                                    value={childname4}
                                                    onChange={(e) => {
                                                        setChildname4(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addchild5 || childname5 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Child Name"
                                                    variant="standard"
                                                    value={childname5}
                                                    onChange={(e) => {
                                                        setChildname5(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            <CancelIcon
                                                //className="fa fa-plus-circle"
                                                style={{
                                                    fontSize: "30px",
                                                    position: "absolute",
                                                    right: "10px",
                                                    top: "30px",
                                                    transform: "rotate(45deg)",
                                                }}
                                                onClick={() => {

                                                    if (addchild == false)
                                                        setAddchild(true);
                                                    if (addchild == true)
                                                        setAddchild3(true)
                                                    if (addchild3 == true)
                                                        setAddchild4(true)
                                                    if (addchild4 == true)
                                                        setAddchild5(true)
                                                }} />
                                        </div>

                                        <div className="col-md-12" style={{ position: "relative" }}>
                                            <TextField
                                                id="filled-basic"
                                                label="Brother Name"
                                                variant="standard"
                                                value={brothername}
                                                onChange={(e) => {
                                                    setBrothername(e.target.value)
                                                }}
                                            />
                                            {addbrother2 || brothername2 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Brother Name"
                                                    variant="standard"
                                                    value={brothername2}
                                                    onChange={(e) => {
                                                        setBrothername2(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addbrother3 || brothername3 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Brother Name"
                                                    variant="standard"
                                                    value={brothername3}
                                                    onChange={(e) => {
                                                        setBrothername3(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addbrother4 || brothername4 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Brother Name"
                                                    variant="standard"
                                                    value={brothername4}
                                                    onChange={(e) => {
                                                        setBrothername4(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addbrother5 || brothername5 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Brother Name"
                                                    variant="standard"
                                                    value={brothername5}
                                                    onChange={(e) => {
                                                        setBrothername5(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            <CancelIcon
                                                // className="fa fa-plus-circle"
                                                style={{
                                                    fontSize: "30px",
                                                    position: "absolute",
                                                    right: "10px",
                                                    top: "30px",
                                                    transform: "rotate(45deg)",
                                                }}
                                                onClick={() => {

                                                    if (addbrother == false)
                                                        setAddbrother(true);
                                                    if (addbrother == true)
                                                        setAddbrother3(true)
                                                    if (addbrother3 == true)
                                                        setAddbrother4(true)
                                                    if (addbrother4 == true)
                                                        setAddbrother5(true)

                                                }} />
                                        </div>

                                        <div className="col-md-12" style={{ position: "relative" }}>
                                            <TextField
                                                id="filled-basic"
                                                label="Sister Name"
                                                variant="standard"
                                                value={sistername}
                                                onChange={(e) => {
                                                    setSistername(e.target.value)
                                                }}
                                            />
                                            {addsister2 || sistername2 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Sister Name"
                                                    variant="standard"
                                                    value={sistername2}
                                                    onChange={(e) => {
                                                        setSistername2(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addsister3 || sistername3 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Sister Name"
                                                    variant="standard"
                                                    value={sistername3}
                                                    onChange={(e) => {
                                                        setSistername3(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addsister4 || sistername4 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Sister Name"
                                                    variant="standard"
                                                    value={sistername4}
                                                    onChange={(e) => {
                                                        setSistername4(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            {addsister5 || sistername5 ?
                                                <TextField
                                                    id="filled-basic"
                                                    label="Sister Name"
                                                    variant="standard"
                                                    value={sistername5}
                                                    onChange={(e) => {
                                                        setSistername5(e.target.value)
                                                    }}
                                                />
                                                : <></>}
                                            <CancelIcon
                                                //className="fa fa-plus-circle"
                                                style={{
                                                    fontSize: "30px",
                                                    position: "absolute",
                                                    right: "10px",
                                                    top: "30px",
                                                    transform: "rotate(45deg)",
                                                }}
                                                onClick={() => {
                                                    if (addsister == false)
                                                        setAddsister(true);
                                                    if (addsister == true)
                                                        setAddsister3(true)
                                                    if (addsister3 == true)
                                                        setAddsister4(true)
                                                    if (addsister4 == true)
                                                        setAddsister5(true)

                                                }} />
                                        </div>

                                    </div>
                                </div>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions style={{ marginBottom: "20px", justifyContent: "center" }}>
                            <Button
                                onClick={() => {
                                    setFathername("")
                                    setMothername("")
                                    setSpouseiname("")
                                    setChildname([])
                                    setChildname2([])
                                    setChildname3([])
                                    setChildname4([])
                                    setChildname5([])
                                    setChildrens([])

                                    setBrothername([])
                                    setBrothername2([])
                                    setBrothername3([])
                                    setBrothername4([])
                                    setBrothername5([])
                                    setBrothers([])

                                    setSistername([])
                                    setSistername2([])
                                    setSistername3([])
                                    setSistername4([])
                                    setSistername5([])
                                    setSisters([])
                                    // setsistercounter(0)
                                }}
                                variant="contained"
                                size="large"
                                className='profile-btn'
                                style={{
                                    width: "120px",
                                    padding: "7px 0px",
                                    textAlign: "center",
                                    display: "initial",
                                    fontSize: "14px"
                                }}
                                autoFocus>
                                Reset
                            </Button>
                            <Button onClick={handleCloseFamily}
                                variant="contained"
                                size="large"
                                className='profile-btn'
                                style={{
                                    width: "120px",
                                    padding: "7px 0px",
                                    textAlign: "center",
                                    display: "initial",
                                    fontSize: "14px"
                                }}
                                autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <center>
                        <Button variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            className='profile-btn'
                            style={{
                                width: "120px",
                                padding: "7px 0px",
                                textAlign: "center",
                                display: "initial",
                                fontSize: "14px"
                            }}
                            autoFocus>
                            Submit
                        </Button>
                    </center>
                </div >
            </div>
        </div>
        </>
    )
}
export default Profile;