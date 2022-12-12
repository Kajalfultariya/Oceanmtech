import React from "react";
import { useEffect } from "react";
import { postFeedbackSave } from "../API";
import Account from "./Account"
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';


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
const Feedback = () => {

    const classes = useStyles();
    const [title, setTitle] = useState("")
    const [msg, setMsg] = useState("")
    const [file, setFile] = useState("")
    const [loaderPage, setLoaderPage] = useState(false);

    useEffect(async () => {

    }, [])


    const handleSave = async () => {
        setLoaderPage(true)

        const formData = new FormData();
        if (document.querySelector('input[type="file"]').files[0] == undefined) {

        }
        else {

            formData.append("file_url", document.querySelector('input[type="file"]').files[0])
        }
        formData.append("title", title);
        formData.append("description", msg);
        const response = await postFeedbackSave(formData)
        if (response) {
            setTitle("")
            setMsg("")
            setFile("")
            setLoaderPage(false)
        }
        console.log("save feddback response", response)

    }
    const imgHandler = (e) => {

        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setFile(fileArray[0])
            Array.from(e.target.files).map((file) => (URL.revokeObjectURL(file)))
        }
    }


    return (
        <>
            <div className="account-main">
                <Account />
                <div className="ac-right">
                    <div class="profile-header">
                        <h1>Feedback</h1>
                    </div>

                    <div className="business-field">
                        <div className="row">
                            <div className="col-md-12">
                                <TextField
                                    id="filled-basic"
                                    label="Title"
                                    variant="standard"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-md-12">
                                <TextField
                                    id="filled-basic"
                                    label="Message"
                                    variant="standard"
                                    multiline
                                    rows={4}
                                    value={msg}
                                    onChange={(e) => {
                                        setMsg(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="col-md-12">
                                <div className="upload-field" style={{ marginTop: '30px' }}>
                                    <div className="result">
                                        {file ? 
                                            <div><img src={file}></img></div> 
                                        : ""}
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
                                            Upload File
                                        </label>                                            
                                    </div>
                                </div>
                                
                            </div>

                            <div className="col-md-12">
                                <Button
                                    variant="contained"
                                    className='profile-btn'
                                    style={{
                                        width: "120px",
                                        padding: "7px 0px",
                                        textAlign: "center",
                                        display: "initial",
                                        fontSize: "14px",
                                        marginTop: "0px"
                                    }}

                                    disabled={loaderPage}
                                    onClick={() => {
                                        handleSave()
                                    }}>
                                    {loaderPage === true ? "please wait ..." : " Save"}
                                </Button>
                            </div>
                        </div>
                        
                        

                        

                        
                    </div>                 

                    
                </div>
            </div>
        </>
    )
}

export default Feedback;