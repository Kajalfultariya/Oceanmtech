import React from "react";
import Account from "./Account"
import { Button } from "@mui/material";

const Cpin = () => {
    return (
        <>
            <div className="account-main">
                <Account />
                <div className="ac-right">
                    <div style={{ width: "50%" }}>

                        <div className="otp-fg">
                            Old PIN Code
                            <input autoFocus id="one" type='text' maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode1(e.target.value)}
                            />
                            <input type='text' id="two" maxLength={1}
                            // onChange={handleFocus}
                            // onBlur={(e) => setCode2(e.target.value)}
                            />
                            <input type='text' id="three" maxLength={1}
                            // onChange={handleFocus}
                            //    onBlur={(e) => setCode3(e.target.value)}
                            />
                            <input type='text' id="four" maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode4(e.target.value)}
                            />


                        </div>

                        <div className="otp-fg">
                            Create PIN Code
                            <input id="one" type='text' maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode1(e.target.value)}
                            />
                            <input type='text' id="two" maxLength={1}
                            // onChange={handleFocus}
                            // onBlur={(e) => setCode2(e.target.value)}
                            />
                            <input type='text' id="three" maxLength={1}
                            // onChange={handleFocus}
                            //    onBlur={(e) => setCode3(e.target.value)}
                            />
                            <input type='text' id="four" maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode4(e.target.value)}
                            />


                        </div>

                        <div className="otp-fg">
                            Confirm PIN Code
                            <input id="one" type='text' maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode1(e.target.value)}
                            />
                            <input type='text' id="two" maxLength={1}
                            // onChange={handleFocus}
                            // onBlur={(e) => setCode2(e.target.value)}
                            />
                            <input type='text' id="three" maxLength={1}
                            // onChange={handleFocus}
                            //    onBlur={(e) => setCode3(e.target.value)}
                            />
                            <input type='text' id="four" maxLength={1}
                            // onChange={handleFocus}
                            //  onBlur={(e) => setCode4(e.target.value)}
                            />


                        </div>
                        <div style={{margin:"30px"}}>
                            <Button variant="outlined">
                                Save
                            </Button>
                        </div>

                    </div></div>
            </div>
        </>
    )
}

export default Cpin;