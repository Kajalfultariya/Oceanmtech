import React from "react";


const Error = (props) => {
    return (
        <>
            <div //className="err-msg"
            >
                <div //className="container"
                >
                    <h3>{props.data}</h3>
                </div>
            </div>
        </>
    )
}

export default Error;