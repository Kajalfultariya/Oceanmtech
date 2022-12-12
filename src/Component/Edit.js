import React, { useRef } from "react";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { postFrame } from "../API";
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router';
import Switch from "./Switch";
import Toggle from "./Toggle";
import { useState } from "react";
import BigFrame from "./BigFrame"
import BigFrame1 from "./BigFrame1"
import SmallFrame from "./SmallFrame";
import SmallFrame1 from "./SmallFrame1";

const Edit = (props) => {
    const history = useHistory();
    const checkRef = useRef();
    const checkRef2 = useRef();
    const [peopleInfo, setPeopleInfo] = useState([]);
    const [peopleInfo1, setPeopleInfo1] = useState([]);

    const item = props.history.location.state?.name;
    const data = props.history.location.state?.data;
    const [tFlag, setTFlag] = useState(true)

    console.log("name", props.history.location.state?.name)
    console.log("data", props.history.location.state?.data)

    const onToggle = state => {
        console.log("ontoggle", state);

        if (state == true)
            setTFlag(true)
        else
            setTFlag(false)
    };


    const [checkflag, setCheckflag] = useState(false)


    const [checkflag2, setCheckflag2] = useState(false)
    const [saveFlag, setSaveFlag] = useState(false)
    const [article, setArticle] = useState([])
    const [article1, setArticle1] = useState([])
    const handleSave = async () => {


        if (peopleInfo.length == 0) {
            alert("Please Select atleast 1 Frame")
        }
        else if (peopleInfo.length <= 5) {

            peopleInfo.forEach((product, index) => {
                article.push({ "frame_id": peopleInfo[index] })
            })
            peopleInfo1.forEach((product, index) => {
                article1.push({ "frame_id": peopleInfo1[index] })
            })

            console.log("story frames", article1)
            const formdata = new FormData();
            formdata.append("frame_ids", JSON.stringify(article))
            formdata.append("story_frame_ids", JSON.stringify(article1));
            formdata.append("business_id", data?.id);
            await postFrame(formdata)
            window.location.href = "/business"
        }
        else {
            alert("Only Five Frame Selected")
        }

    }

    return (
        <>
            <div className="frame-box">
                <div className="frame-left-sidebar">
                    {tFlag ?
                        <BigFrame
                            item={item?.post}
                            data={data}
                        /> :
                        <BigFrame1
                            item={item?.story}
                            data={data}
                        />}
                </div>

                <div className="frame-right-sidebar">
                    <Toggle onToggle={onToggle}>
                        {({ on, onToggle }) => (
                            <div>
                                <div className="dmt-switch frame-switch">
                                    <span>{on ? "Post" : "Story"} </span>
                                    <Switch on={on} onSwitch={onToggle} />
                                </div>

                                <div className="profile-frame-galllery">
                                    {on ? item?.post?.length > 0 ? item.post?.map((itemunder) => {
                                        return (
                                            <>
                                                <div className="pfg-col"
                                                    style={{// marginTop: "5px", marginRight: "5px"
                                                    }}
                                                    onLoad={() => {
                                                        if (itemunder?.is_selected == 1) {

                                                            const filter = peopleInfo.find(c => c === itemunder?.id)

                                                            if (filter == undefined) {
                                                                peopleInfo.push(itemunder?.id)
                                                            }

                                                        }
                                                    }}
                                                >
                                                    {checkflag == false ?
                                                        <div onClick={() => { setCheckflag(true) }}>
                                                            <input
                                                                ref={checkRef}
                                                                value={itemunder?.id}
                                                                checked={itemunder?.is_selected == 0 ? false : true}
                                                                style={{
                                                                    height: "20px",
                                                                    width: "20px",
                                                                    backgroundColor: "darkblue"
                                                                }}
                                                                type="checkbox"
                                                                onChange={(e) => { peopleInfo.push(parseInt(e.target.value)) }}
                                                            />
                                                            <SmallFrame
                                                                item={itemunder}
                                                                data={data}
                                                            />
                                                        </div>
                                                        :
                                                        <div
                                                        >
                                                            <input
                                                                ref={checkRef}
                                                                value={itemunder?.is_selected}

                                                                style={{
                                                                    height: "20px",
                                                                    width: "20px",
                                                                }}
                                                                type="checkbox"
                                                                onChange={(e) => {
                                                                    checkRef.current.checked = e.target.checked
                                                                    if (e.target.checked) {
                                                                        peopleInfo.push(itemunder?.id)
                                                                    }
                                                                    else {
                                                                        const findIdx = peopleInfo.indexOf(itemunder?.id);
                                                                        if (findIdx > -1) {
                                                                            peopleInfo.splice(findIdx, 1);
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <SmallFrame
                                                                item={itemunder}
                                                                data={data}
                                                            />
                                                        </div>}
                                                </div>

                                            </>
                                        )
                                    }) : "" :

                                        item?.story?.length > 0 ? item.story?.map((itemunder) => {
                                            console.log("item", item)
                                            return (
                                                <>
                                                    <div className="pfsg-col"
                                                        onLoad={() => {
                                                            if (itemunder?.is_selected == 1) {

                                                                const filter = peopleInfo1.find(c => c === itemunder?.id)

                                                                if (filter == undefined) {
                                                                    peopleInfo1.push(itemunder?.id)
                                                                }

                                                            }
                                                        }}
                                                    >
                                                        {checkflag2 == false ?
                                                            <div
                                                                onClick={() => { setCheckflag2(true) }}
                                                            >
                                                                <input
                                                                    ref={checkRef2}
                                                                    value={itemunder?.id}
                                                                    checked={itemunder?.is_selected == 0 ? false : true}
                                                                    style={{
                                                                        height: "20px",
                                                                        width: "20px",
                                                                        backgroundColor: "darkblue"
                                                                    }}
                                                                    type="checkbox"
                                                                    onChange={(e) => { peopleInfo1.push(parseInt(e.target.value)) }}
                                                                />
                                                                <span>
                                                                    <SmallFrame1
                                                                        item={itemunder}
                                                                        data={data}
                                                                    />
                                                                </span>
                                                            </div>
                                                            :
                                                            <div
                                                            >
                                                                <input
                                                                    ref={checkRef2}
                                                                    value={itemunder?.is_selected}

                                                                    style={{
                                                                        height: "20px",
                                                                        width: "20px",
                                                                    }}
                                                                    type="checkbox"
                                                                    onChange={(e) => {
                                                                        checkRef2.current.checked = e.target.checked
                                                                        if (e.target.checked) {
                                                                            peopleInfo1.push(itemunder?.id)
                                                                        }
                                                                        else {
                                                                            const findIdx = peopleInfo1.indexOf(itemunder?.id);
                                                                            if (findIdx > -1) {
                                                                                peopleInfo1.splice(findIdx, 1);
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                <span>
                                                                    <SmallFrame1
                                                                        item={itemunder}
                                                                        data={data}
                                                                    />
                                                                </span>
                                                            </div>
                                                        }

                                                    </div>

                                                </>
                                            )
                                        }) : ""}
                                </div>
                            </div>
                        )}
                    </Toggle>

                    <Button variant="contained" className='business-next-btn'
                        onClick={handleSave} style={{ margin: "20px" }}>Save</Button>

                </div>

            </div>

        </>
    )
}


export default Edit;