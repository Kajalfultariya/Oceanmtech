import React, { Fragment, useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Link from '@mui/material/Link';
import { deleteUser } from "../API";
import Error from "./Error";
import { useHistory } from 'react-router';


const Mypost = () => {


    const [apiError, setApiError] = useState("")
    const history = useHistory();


    const handleDelete = async () => {
        const response = await deleteUser()
        console.log("delte", response)
        if (response) {
            if (response?.status === 200) {
                localStorage.clear();
                window.location.href = "/"
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

    return (
        <Fragment>

            <div className="ac-left">
                <ul>

                    <li>
                        <Link onClick={() => {
                            confirmAlert({
                                //  title: 'Confirm to submit',
                                message: 'Are you sure to delete business ?? ',
                                buttons: [
                                    {
                                        label: 'Ok',
                                        onClick: () => handleDelete()
                                    },
                                    {
                                        label: 'Cancle',
                                        // onClick: () => alert('Click No')
                                    }
                                ]
                            });
                            // handleDelete()
                        }}>


                           {console.log("dfsdfdsfsdfs",JSON.parse(localStorage.getItem("LanguageData")))} 
                         {JSON.parse(localStorage.getItem("LanguageData")).setting_lable13 ?
                         JSON.parse(localStorage.getItem("LanguageData")).setting_lable13 :" Delete Your Account "}
                        </Link>
                    </li>


                    <li>
                        <Link onClick={() => {
                            history.push("/profile")
                        }}>
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            history.push("/business")
                        }}>
                            Business Frame & Selection
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            history.push("/language")
                        }}>
                            My Language
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            history.push("/post")
                        }}>
                            My Post
                        </Link>
                    </li>

                    <li>
                        <Link onClick={() => {
                            history.push("/digital-card")
                        }}>
                            My Digital Card
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            history.push("/pre-plan")

                        }}>
                            Premium Plan
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            history.push("/order")
                        }}>
                            Order History
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            history.push("/feedback")
                        }}>
                            Feedback
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            //  window.location.reload()
                        }}>
                            My Catalog
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            // window.location.reload()
                        }}>
                            My Referreal Code
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            history.push("/help")
                        }}>
                            Help & Support
                        </Link>
                    </li>

                    <li>
                        <Link onClick={() => {
                            // window.location.reload()
                        }}>
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {

                            history.push("/cpin")

                        }}>
                            Change Pin
                        </Link>
                    </li>

                </ul>

            </div>
            {
                apiError !== undefined && (
                    <Error data={apiError} />
                )
            }

        </Fragment>
    )
}

export default Mypost