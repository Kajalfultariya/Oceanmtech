import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import StyledSpinner from "../StyledComponent";
import { styled, useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Account from "./Account"
import Profile from "./Profile"

import {
    getProfileData
} from "../API";

import defaultLogo from "../Image/defaultLogo.jpg"


const DisplayProfile = () => {


    const [profileData, setProfileData] = useState([])
    const [tab, setTab] = useState("Display Profile")
    const [load, setLoad] = useState(false)


    useEffect(() => {
        fetchProfile();
    }, []);


    const fetchProfile = async () => {
        const response = await getProfileData();
        console.log("get Profile data", response?.data)
        if (response) {
            setProfileData(response?.data)
            setLoad(true)
        }
    }
    const [childrens, setChildrens] = useState([])
    const [brothers, setBrothers] = useState([])
    const [sisters, setSisters] = useState([])

    useEffect(() => {
        if (profileData) {
            profileData.children?.map((item, index) => {
                if (index > 0)
                    childrens.push(",")
                childrens.push(item?.name)

            })
            profileData.brother?.map((item, index) => {
                if (index > 0)
                    brothers.push(",")
                brothers.push(item?.name)
            })
            profileData.sister?.map((item, index) => {
                if (index > 0)
                    sisters.push(",")
                sisters.push(item?.name)
            })
        }
    }, [profileData])


    /*   $(window).load(function() {
           $('#loading3').hide();
         });
   */
    var string = "text to split";
    var words = string.split(" ");
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className="account-main">
                <Account />
                <div className="ac-right">

                    <div className="profile-main">
                        <div className="profile-header">
                            <h1>My Profile</h1>
                            <Button
                                variant="contained"
                                id="Button-icon"
                                onClick={() => {
                                    window.location.href = "/update-profile"
                                }}>
                                Edit Profile
                            </Button>

                        </div>
                        {load ?
                            <>
                                <div className="profile-info">
                                    <div className="row" style={{ marginBottom: "30px" }}>
                                        <div className="col">
                                            <div className="profile-crnt-pic">
                                                <figure>
                                                    <div style={{ display: loading ? "block" : "none" }}>
                                                        <StyledSpinner size={50} />
                                                    </div>

                                                    <img
                                                        src={profileData?.logo ? profileData?.logo : defaultLogo}
                                                        style={{ display: loading ? "none" : "block" }}
                                                        onLoad={() => setLoading(false)} />

                                                </figure>
                                                <h4>{profileData?.name}</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <TableContainer>
                                                <Table aria-label="simple table" className="pofile-table">
                                                    <TableBody>
                                                        <TableRow scope="row">
                                                            <TableCell>Email</TableCell>
                                                            <TableCell>{profileData?.email}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Gender</TableCell>
                                                            <TableCell>{profileData?.gender}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Mobile</TableCell>
                                                            <TableCell>{profileData?.mobile_no}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Birth Date</TableCell>
                                                            <TableCell>{profileData?.date_of_birth}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Anniversary Date </TableCell>
                                                            <TableCell>{profileData?.anniversary_date}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <TableContainer>
                                                <Table aria-label="simple table" className="pofile-table">
                                                    <TableBody>
                                                        <TableRow scope="row">
                                                            <TableCell>Language</TableCell>
                                                            <TableCell>{profileData?.user_language_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Religion </TableCell>
                                                            <TableCell>{profileData?.religion_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Country</TableCell>
                                                            <TableCell>{profileData?.country_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>State</TableCell>
                                                            <TableCell>{profileData?.state_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>City</TableCell>
                                                            <TableCell>{profileData?.city_name}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                        <div className="col-md-6">
                                            <TableContainer>
                                                <Table aria-label="simple table" className="pofile-table">
                                                    <TableBody>
                                                        <TableRow scope="row">
                                                            <TableCell>Father's Name</TableCell>
                                                            <TableCell>{profileData?.father_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Mother's Name </TableCell>
                                                            <TableCell>{profileData?.mother_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Spouse's name</TableCell>
                                                            <TableCell>{profileData?.spouse_name}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Children's name</TableCell>
                                                            <TableCell>{childrens}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Brother's name</TableCell>
                                                            <TableCell>{brothers}</TableCell>
                                                        </TableRow>
                                                        <TableRow scope="row">
                                                            <TableCell>Sister's Name</TableCell>
                                                            <TableCell>{sisters}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <StyledSpinner size={50} />
                        }

                    </div>


                </div></div>
        </>
    )
}

export default DisplayProfile;

{/* <Profile />*/ }