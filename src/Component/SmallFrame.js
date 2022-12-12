import React from "react";
import { Fragment } from "react";
import facebook from "../Image/facebook.jpg"
import tweeter from "../Image/tweet.jpg"
import instagram from "../Image/insta.jpg"
import youtube from "../Image/youtube.jpg"
import whtzup from "../Image/whtzup.jpg"
import mail from "../Image/gmail.jpg"
import snapchat from "../Image/snap.jpg"
import pinterest from "../Image/pint.jpg"

const SmallFrame = (props) => {
    const item = props?.item
    const data = props?.data
    console.log("item details", item, item?.length)
    var txaim1 = "";
    var txaim2 = "";
    var txain = "";
    var txaie = "";
    var txaiw = "";
    var txaia = "";
    var txaip = "";
    var txaisoc = ""
    let marsoc = ""
    console.log("icons", item?.social_icon)
    if (data?.social_icones) {
        if (item?.social_icon?.alignment == null) {

        }
        else {
            if (item?.social_icon?.alignment == "L")
                txaisoc = "left"
            if (item?.social_icon?.alignment == "R")
                txaisoc = "right"
            if (item?.social_icon?.alignment == "C")
                txaisoc = "center"
            marsoc = item?.social_icon?.icon_margin.split(',')
        }


    }

    return (
        <Fragment>
            {item?.id ?
                <div

                    style={{
                        //   backgroundImage: 'url(https://oceanmtech.b-cdn.net/dmt/event_data_file/20220225110925-j02mjm.png)',
                        backgroundSize: "cover",
                        border: "2px solid black",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",

                        height: item?.height / 5.9,
                        width: item?.width / 6,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {item.image ?

                        <img
                            src={item.image}
                            style={{
                                height: item?.height / 6,
                                width: item?.width / 6,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        />

                        : ""}

                    {data?.logo ? <img
                        //referrerPolicy="no-referrer"
                        // crossOrigin="anonymous"
                        style={{
                            position: "absolute",
                            top: item?.logo?.posx / 6,
                            left: item?.logo?.posy / 6,
                            height: item?.logo?.height / 6,
                            width: item?.logo?.width / 6

                        }}
                        src={data?.logo
                        }
                        alt=" " /> : ""}

                    <div style={{
                        position: "absolute",
                        top: item?.social_icon?.posy / 6,
                        left: item?.social_icon?.posx / 6,
                        height: item?.social_icon?.height / 6,
                        width: item?.social_icon?.width / 6 - 10,
                        display: "flex",
                        justifyContent: txaisoc,

                        //orien

                    }}>

                        {data?.social_icones[12] == "1" ?

                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={facebook}
                                alt="background" />
                            : <></>}
                        {data?.social_icones[24] == "1" ?

                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={tweeter}
                                alt="background" />
                            : <></>}
                        {data?.social_icones[38] == "1" ?


                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={instagram}
                                alt="background" />

                            : <></>}
                        {data?.social_icones[50] == "1" ?


                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={youtube}
                                alt="background" />

                            : <></>}
                        {data?.social_icones[66] == "1" ?


                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={whtzup}
                                alt="background" />

                            : <></>}
                        {data?.social_icones[76] == "1" ?


                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={mail}
                                alt="background" />
                            : <></>}
                        {data?.social_icones[89] == "1" ?



                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={snapchat}
                                alt="background" />

                            : <></>}
                        {data?.social_icones[103] == "1" ?


                            <img
                                referrerPolicy="no-referrer"
                                // crossOrigin="anonymous"
                                style={{
                                    height: item?.social_icon?.icon_height / 6,
                                    width: item?.social_icon?.icon_width / 6,
                                    margintop: `${marsoc[2] / 6}px`,
                                    marginRight: `${marsoc[1] / 6}px`,
                                    marginBottom: `${marsoc[3] / 6}px`,
                                    marginLeft: `${marsoc[0] / 6}px`,
                                }}
                                src={pinterest}
                                alt="background" />

                            : <></>}
                    </div>

                    {
                        item?.layer?.map((itemunder) => {
                            //mobile1
                            if (itemunder?.res_type == "mobile_no1") {

                                if (itemunder?.align == "L")
                                    txaim1 = "left"
                                if (itemunder?.align == "R")
                                    txaim1 = "right"
                                if (itemunder?.align == "C")
                                    txaim1 = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div

                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            justifyContent: txaim1,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            version="1.0"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none">
                                                <path
                                                    d="M1338 4723 c-1 -5 -25 -19 -53 -33 -27 -14 -90 -61 -140 -105 -49 -44 -114 -99 -145 -123 -110 -86 -259 -278 -326 -421 -99 -211 -134 -376 -134 -628 0 -245 33 -415 135 -703 99 -280 411 -779 679 -1085 29 -33 85 -96 123 -141 109 -124 335 -349 463 -460 354 -309 715 -511 1060 -593 47 -12 98 -21 112 -21 15 0 30 -4 33 -10 8 -14 435 -14 435 0 0 6 12 10 26 10 15 0 78 14 142 30 204 54 393 168 612 369 206 190 220 211 220 335 0 65 -4 82 -37 147 -30 61 -60 97 -162 199 -140 139 -327 298 -420 359 -34 21 -100 56 -149 77 -80 34 -95 38 -183 38 -93 1 -98 0 -182 -42 -87 -43 -128 -76 -302 -242 -113 -108 -139 -126 -208 -144 -121 -32 -294 26 -462 153 -161 123 -446 424 -600 635 -193 266 -266 427 -267 591 -1 138 35 197 187 310 61 45 153 124 206 176 81 79 100 104 119 154 42 113 42 219 -2 360 -33 107 -94 215 -296 519 -65 97 -191 228 -249 257 -26 13 -49 27 -51 32 -2 4 -43 7 -92 7 -49 0 -90 -3 -92 -7z" />
                                            </g>
                                        </svg>
                                        {data?.mobile_no}
                                    </div>
                                )
                            }

                            //mobile_2
                            if (itemunder?.res_type == "mobile_no2") {
                                if (itemunder?.align == "L")
                                    txaim2 = "left"
                                if (itemunder?.align == "R")
                                    txaim2 = "right"
                                if (itemunder?.align == "C")
                                    txaim2 = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div
                                        // ref={mobile1Ref}
                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txaim2,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            version="1.0"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none">
                                                <path
                                                    d="M1338 4723 c-1 -5 -25 -19 -53 -33 -27 -14 -90 -61 -140 -105 -49 -44 -114 -99 -145 -123 -110 -86 -259 -278 -326 -421 -99 -211 -134 -376 -134 -628 0 -245 33 -415 135 -703 99 -280 411 -779 679 -1085 29 -33 85 -96 123 -141 109 -124 335 -349 463 -460 354 -309 715 -511 1060 -593 47 -12 98 -21 112 -21 15 0 30 -4 33 -10 8 -14 435 -14 435 0 0 6 12 10 26 10 15 0 78 14 142 30 204 54 393 168 612 369 206 190 220 211 220 335 0 65 -4 82 -37 147 -30 61 -60 97 -162 199 -140 139 -327 298 -420 359 -34 21 -100 56 -149 77 -80 34 -95 38 -183 38 -93 1 -98 0 -182 -42 -87 -43 -128 -76 -302 -242 -113 -108 -139 -126 -208 -144 -121 -32 -294 26 -462 153 -161 123 -446 424 -600 635 -193 266 -266 427 -267 591 -1 138 35 197 187 310 61 45 153 124 206 176 81 79 100 104 119 154 42 113 42 219 -2 360 -33 107 -94 215 -296 519 -65 97 -191 228 -249 257 -26 13 -49 27 -51 32 -2 4 -43 7 -92 7 -49 0 -90 -3 -92 -7z" />
                                            </g>
                                        </svg>

                                        {data?.mobile_no_2}

                                    </div>
                                )
                            }


                            //profile name
                            if (itemunder?.res_type == "profile_name1") {
                                if (itemunder?.align == "L")
                                    txaip = "left"
                                if (itemunder?.align == "R")
                                    txaip = "right"
                                if (itemunder?.align == "C")
                                    txaip = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div
                                        // ref={mobile1Ref}
                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txaip,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            version="1.0"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none">
                                                <path
                                                    d="M2378 4555 c-229 -38 -440 -153 -606 -329 -127 -134 -212 -286 -260 -465 -23 -85 -26 -116 -26 -271 -1 -162 1 -183 27 -275 106 -386 394 -672 782 -778 69 -18 105 -21 265 -21 173 0 191 2 275 27 186 57 327 140 468 276 162 157 262 330 314 543 14 56 18 112 17 238 -1 144 -4 177 -26 261 -93 347 -355 631 -688 747 -168 58 -370 76 -542 47z" />
                                                <path
                                                    d="M1504 2414 c-467 -292 -789 -747 -907 -1284 -30 -132 -47 -276 -47 -386 0 -92 23 -141 80 -173 l38 -21 1892 0 1892 0 38 21 c58 33 80 81 80 177 0 189 -60 490 -136 683 -154 393 -432 733 -784 962 -138 89 -128 88 -199 28 -178 -147 -384 -247 -613 -298 -103 -22 -438 -25 -533 -5 -243 53 -458 155 -634 302 -33 28 -64 50 -69 50 -5 0 -49 -25 -98 -56z" />
                                            </g>
                                        </svg>

                                        {data?.name}

                                    </div>
                                )
                            }

                            //business name
                            if (itemunder?.res_type == "business_name1") {
                                if (itemunder?.align == "L")
                                    txain = "left"
                                if (itemunder?.align == "R")
                                    txain = "right"
                                if (itemunder?.align == "C")
                                    txain = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div
                                        // ref={mobile1Ref}
                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txain,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >

                                        {data?.business_name}

                                    </div>
                                )
                            }

                            //email
                            if (itemunder?.res_type == "email1") {
                                if (itemunder?.align == "L")
                                    txaie = "left"
                                if (itemunder?.align == "R")
                                    txaie = "right"
                                if (itemunder?.align == "C")
                                    txaie = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (<>
                                    <div

                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txaie,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            version="1.0"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none" >
                                                <path
                                                    d="M788 3948 c-16 -5 -28 -13 -28 -16 0 -4 389 -395 863 -870 742 -743 867 -864 900 -871 88 -20 41 -62 974 871 475 475 863 866 863 870 0 26 -115 28 -1804 27 -1139 0 -1751 -4 -1768 -11z" />
                                                <path
                                                    d="M576 3730 c-14 -36 -16 -155 -16 -1170 0 -1015 2 -1134 16 -1170 9 -22 19 -40 23 -40 3 0 278 272 611 605 l605 605 -605 605 c-333 333 -608 605 -611 605 -4 0 -14 -18 -23 -40z" />
                                                <path
                                                    d="M3910 3165 l-605 -605 605 -605 c333 -333 608 -605 611 -605 4 0 14 18 23 40 14 36 16 155 16 1170 0 1015 -2 1134 -16 1170 -9 22 -19 40 -23 40 -3 0 -278 -272 -611 -605z" />
                                                <path
                                                    d="M1362 1796 c-331 -332 -602 -606 -602 -609 0 -25 130 -27 1800 -27 1685 0 1800 2 1800 28 0 4 -272 279 -605 612 l-605 605 -190 -192 c-130 -130 -205 -198 -236 -212 -104 -49 -212 -51 -315 -5 -46 21 -91 60 -245 215 -104 104 -191 189 -194 189 -3 0 -277 -272 -608 -604z" />
                                            </g>
                                        </svg>


                                        {data?.email}

                                    </div>

                                </>
                                )
                            }

                            //website
                            if (itemunder?.res_type == "website1") {
                                if (itemunder?.align == "L")
                                    txaiw = "left"
                                if (itemunder?.align == "R")
                                    txaiw = "right"
                                if (itemunder?.align == "C")
                                    txaiw = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div
                                        // ref={mobile1Ref}
                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txaiw,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >
                                        <svg version="1.0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <metadata>
                                                Created by potrace 1.16, written by Peter Selinger 2001-2019
                                            </metadata>
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none">
                                                <path d="M2374 4542 c-39 -15 -102 -45 -140 -67 -91 -53 -263 -224 -337 -336
                                      -52 -79 -156 -265 -157 -280 0 -8 100 -32 222 -54 111 -20 371 -45 466 -45
                                      l72 0 0 405 0 405 -27 -1 c-16 -1 -60 -13 -99 -27z"/>
                                                <path d="M2620 4165 l0 -405 73 0 c94 0 354 25 465 45 117 21 222 46 222 53 0
                                              13 -107 205 -158 282 -73 111 -244 282 -338 336 -69 41 -208 94 -245 94 -18 0
                                      -19 -15 -19 -405z"/>
                                                <path d="M1945 4475 c-214 -70 -417 -176 -593 -310 -120 -92 -142 -111 -142
                                                    -122 0 -17 351 -153 394 -153 9 0 37 43 70 108 93 181 197 325 320 444 33 32
                                            58 60 55 62 -2 2 -49 -11 -104 -29z"/>
                                                <path d="M3070 4500 c0 -5 17 -22 37 -39 100 -82 255 -295 344 -473 34 -68 55
                                            -98 67 -98 43 0 392 137 392 153 0 11 -22 30 -142 122 -120 91 -255 172 -389
                                            231 -145 64 -309 119 -309 104z"/>
                                                <path d="M1026 3858 c-154 -185 -250 -345 -336 -559 -28 -67 -50 -125 -50
                                            -128 0 -3 173 -5 384 -3 355 2 385 4 390 20 2 9 10 44 16 77 21 110 69 291
                                          105 395 19 57 32 106 30 110 -2 4 -26 13 -52 20 -78 22 -249 88 -323 125 -38
                                        19 -74 35 -79 35 -5 0 -43 -42 -85 -92z"/>
                                                <path d="M3930 3915 c-69 -36 -244 -103 -323 -125 -26 -7 -50 -16 -52 -20 -3
                                        -4 11 -54 31 -111 35 -106 83 -286 104 -394 6 -33 14 -68 16 -77 5 -16 35 -18
                                              390 -20 211 -2 384 0 384 3 0 3 -22 61 -50 128 -59 147 -121 265 -201 381 -74
                                            108 -208 270 -223 269 -6 0 -40 -15 -76 -34z"/>
                                                <path d="M1672 3688 c-51 -137 -132 -441 -132 -497 0 -21 1 -21 480 -21 l480
                                              0 0 235 0 235 -64 0 c-188 0 -577 51 -728 96 -12 4 -21 -8 -36 -48z"/>
                                                <path d="M3340 3719 c-124 -30 -405 -68 -567 -75 l-153 -7 0 -233 0 -234 480
                                            0 c479 0 480 0 480 21 0 79 -136 551 -158 548 -4 -1 -41 -9 -82 -20z"/>
                                                <path d="M614 3042 c-12 -8 -16 -23 -45 -182 -14 -80 -19 -151 -19 -300 0
                                        -149 5 -220 19 -300 29 -159 33 -174 45 -182 6 -4 882 -8 1946 -8 1064 0 1940
                                          4 1946 8 12 8 16 26 45 187 21 122 27 453 9 542 -5 26 -17 89 -26 138 -9 50
                                        -22 93 -28 97 -6 4 -882 8 -1946 8 -1064 0 -1940 -4 -1946 -8z m388 -174 c9
                                        -7 41 -83 71 -168 81 -226 77 -218 88 -198 10 18 84 221 104 286 21 67 41 92
                                          75 92 15 0 35 -6 42 -13 7 -8 42 -95 78 -195 36 -100 68 -182 71 -182 4 0 19
                                          35 33 78 106 302 111 312 154 312 30 0 62 -26 62 -50 0 -27 -191 -553 -208
                                        -572 -21 -25 -67 -23 -85 2 -8 12 -43 99 -77 195 -35 96 -66 175 -69 175 -3 0
                                        -35 -82 -70 -183 -35 -100 -71 -188 -79 -194 -20 -17 -67 -17 -80 0 -6 7 -32
                                          71 -57 142 -26 72 -71 197 -100 278 -30 81 -51 156 -48 165 11 31 25 42 52 42
                                        15 0 34 -6 43 -12z m1221 -2 c7 -8 43 -96 78 -195 35 -100 67 -181 70 -181 3
                                        0 34 80 69 178 35 97 70 185 78 195 8 9 27 17 42 17 15 0 34 -8 42 -17 8 -10
                                        43 -98 78 -195 35 -98 66 -178 69 -178 3 0 35 82 70 181 35 99 71 187 78 195
                                        23 23 70 17 89 -11 19 -29 25 -8 -87 -316 -49 -135 -89 -250 -89 -254 0 -5 -7
                                        -17 -17 -27 -21 -23 -65 -23 -85 0 -9 9 -44 97 -79 195 -34 97 -66 177 -69
                                        177 -3 0 -35 -80 -69 -177 -35 -98 -70 -186 -79 -195 -8 -10 -26 -18 -40 -18
                                              -26 0 -62 25 -62 43 0 5 -40 121 -89 256 -112 308 -106 287 -87 316 19 28 66
                                        34 89 11z m1219 -3 c14 -17 40 -85 114 -295 14 -43 29 -78 33 -78 3 0 35 82
                                          71 182 36 100 71 187 78 195 7 7 27 13 42 13 33 0 50 -20 73 -90 33 -96 98
                                      -273 106 -288 11 -20 7 -28 88 198 30 85 62 161 71 168 27 21 75 11 89 -19 11
                                        -23 7 -42 -41 -175 -30 -82 -75 -207 -101 -279 -25 -71 -51 -135 -57 -142 -13
                                        -17 -60 -17 -80 0 -8 6 -44 94 -79 194 -35 101 -67 183 -70 183 -8 0 -10 -6
                                        -79 -200 -28 -80 -58 -155 -66 -167 -18 -28 -64 -31 -86 -5 -16 18 -208 544
                                            -208 570 0 45 72 69 102 35z"/>
                                                <path d="M640 1949 c0 -3 22 -61 50 -128 59 -147 121 -265 201 -381 67 -99
                                      207 -270 220 -270 5 0 41 16 79 35 74 37 245 103 323 125 26 7 50 16 52 20 2
                                      4 -11 53 -30 110 -36 104 -84 285 -105 395 -6 33 -14 68 -16 77 -5 16 -35 18
                                          -390 20 -211 2 -384 0 -384 -3z"/>
                                                <path d="M4093 1952 c-353 -2 -382 -4 -387 -20 -2 -9 -10 -44 -16 -77 -21
                                        -108 -69 -288 -104 -394 -20 -57 -34 -107 -31 -111 2 -4 26 -13 52 -20 77 -22
                                                  253 -89 326 -126 37 -19 72 -34 76 -34 13 0 154 174 220 270 32 47 81 128 109
                                              180 48 90 149 329 141 333 -2 1 -176 1 -386 -1z"/>
                                                <path d="M1540 1929 c0 -55 81 -360 131 -495 l20 -52 87 19 c154 35 403 67
                                                    565 75 l157 7 0 233 0 234 -480 0 c-479 0 -480 0 -480 -21z"/>
                                                <path d="M2620 1716 l0 -233 157 -7 c162 -8 411 -40 565 -75 l87 -19 20 52
                                          c50 135 131 440 131 495 0 21 -1 21 -480 21 l-480 0 0 -234z"/>
                                                <path d="M2188 1345 c-179 -18 -448 -67 -448 -83 0 -13 106 -203 158 -281 73
                                              -112 243 -282 338 -337 69 -41 208 -94 245 -94 18 0 19 15 19 405 l0 405 -92
                                      -1 c-51 -1 -150 -7 -220 -14z"/>
                                                <path d="M2620 955 c0 -390 1 -405 19 -405 37 0 176 53 245 94 94 54 265 225
                                          338 336 51 77 158 269 158 282 0 7 -106 33 -220 53 -115 20 -367 45 -462 45
                                            l-78 0 0 -405z"/>
                                                <path d="M1480 1194 c-127 -45 -270 -107 -270 -117 0 -11 22 -30 142 -122 120
                                    -91 255 -171 390 -232 108 -48 300 -114 308 -106 3 2 -16 23 -41 46 -117 107
                                                -250 290 -340 470 -57 113 -49 111 -189 61z"/>
                                                <path d="M3451 1133 c-90 -180 -226 -367 -340 -469 -25 -23 -44 -44 -41 -47 8
                                              -8 198 57 308 106 135 61 270 141 390 232 120 92 142 111 142 122 0 17 -348
                                            153 -392 153 -13 0 -32 -28 -67 -97z"/>
                                            </g>
                                        </svg>


                                        {data?.website}

                                    </div>
                                )
                            }

                            //address
                            if (itemunder?.res_type == "address1") {
                                if (itemunder?.align == "L")
                                    txaia = "left"
                                if (itemunder?.align == "R")
                                    txaia = "right"
                                if (itemunder?.align == "C")
                                    txaia = "center"

                                let mar1 = itemunder?.text_margin.split(',')

                                return (
                                    <div
                                        // ref={mobile1Ref}
                                        style={{
                                            top: itemunder?.posy / 6,
                                            left: itemunder?.posx / 6,
                                            fontWeight: "bold",
                                            position: "absolute",
                                            display: "flex",
                                            textAlign: txaia,
                                            margintop: `${mar1[0] / 6}px`,
                                            marginRight: `${mar1[1] / 6}px`,
                                            marginBottom: `${mar1[2] / 6}px`,
                                            marginLeft: `${mar1[3] / 6}px`,
                                            fontFamily: itemunder?.font_name,
                                            height: itemunder?.height / 6,
                                            width: itemunder?.width / 6,
                                            color: "#" + itemunder?.text_color,
                                            fontSize: itemunder?.font_size / 3 + "pt"
                                        }}
                                    >

                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            version="1.0"
                                            width={itemunder?.icon_width / 6}
                                            height={itemunder?.icon_height / 6}
                                            viewBox="0 0 512.000000 512.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g
                                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill={"#" + itemunder?.text_color}
                                                stroke="none">
                                                <path
                                                    d="M2205 4936 c-428 -89 -803 -329 -1068 -682 -138 -183 -232 -381
                                         -295 -614 l-36 -135 0 -265 -1 -265 37 -127 c103 -353 311 -774 648
                                          -1313 229 -367 550 -824 847 -1207 122 -156 149 -178 223 -178 87 0
                                           100 12 361 360 651 865 1142 1690 1314 2207 75 223 85 286 85 509 0 
                                           217 -11 304 -55 459 -79 272 -208 502 -400 712 -250 273 -580 460 -945 
                                           538 -111 23 -140 25 -363 24 -212 0 -256 -3 -352 -23z m510 -962 c168 
                                           -40 327 -167 403 -324 177 -363 2 -775 -378 -892 -112 -34 -265 -32 -375 
                                           6 -225 77 -373 243 -419 468 -30 147 -13 278 53 413 131 265 422 399 716 329z" />
                                            </g>
                                        </svg>

                                        {data?.address}

                                    </div>
                                )
                            }
                        })}
                </div>
                : <p style={{ color: "red" }}>Network Problem</p>}
        </Fragment>
    )
}

export default SmallFrame