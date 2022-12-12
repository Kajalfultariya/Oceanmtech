import React, { useRef, useState } from "react";
import "./resize.css"
import { Button } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import $ from 'jquery';
import { Alert } from "bootstrap";
const Card = () => {
//    const [resizeFlag, setResizeFlag] = useState(false)
  
let resizeFlag=false
const [stopRotate,setStopRotate]=useState(false)
let dragFlag=false
const textCssRef = useRef();
    const textRef = useRef();
    const nRef = useRef();
    const sRef = useRef();
    const wRef = useRef();
    const eRef = useRef();
    const nwRef = useRef();
    const neRef = useRef();
    const seRef = useRef();
    const swRef = useRef();


    var count = 0;

    //rotation
    const rotateHandle = () => {
        count++;
      
            var deg = count * 10;
            textCssRef.current.style.transform = "rotate(" + deg + "deg)"
        
           console.log("rotate",textCssRef.current.style.transform.substr(7).slice(0,-4));

       
        
    }
    
    //drag
    const elemRef = useRef(null)
    const dragProps = useRef()

    const initialiseDrag = event => {
        dragFlag=true
        const { target, clientX, clientY } = event
        const { offsetTop, offsetLeft } = target
        if (!resizeFlag) {
            const { left, top } = textCssRef.current.getBoundingClientRect()

            dragProps.current = {
                dragStartLeft: left - offsetLeft,
                dragStartTop: top - offsetTop,
                dragStartX: clientX,
                dragStartY: clientY
            }
            window.addEventListener('mousemove', startDragging, false)
            window.addEventListener('mouseup', stopDragging, false)
        }
    }


    const startDragging = ({ clientX, clientY }) => {
        textCssRef.current.style.transform = `translate(${dragProps.current.dragStartLeft + clientX - dragProps.current.dragStartX}px, ${dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY}px)`
    }

    const stopDragging = () => {
        window.removeEventListener('mousemove', startDragging, false)
        window.removeEventListener('mouseup', stopDragging, false)
    }
    /*  let offsetX, offsetY
      const moveWindow = event => {
          const eventTarget = event.target
          eventTarget.style.left = `${event.pageX - offsetX}px`
          eventTarget.style.top = `${event.pageY - offsetY}px`
      }
      const addWindow = event => {
          const eventTarget = event.target
          offsetX = event.clientX - eventTarget.getBoundingClientRect().left
          offsetY = event.clientY - eventTarget.getBoundingClientRect().top
          eventTarget.addEventListener('mousemove', moveWindow)
      }
      const removeWindow = event => {
          const eventTarget = event.target
          eventTarget.removeEventListener('mousemove', moveWindow)
      }
  */

    //resize
    function resizeable() {
resizeFlag = true;
        var resizers = document.querySelectorAll('.n, .s, .w, .e, .se, .sw');
        const min = 40;
        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            const element = currentResizer.parentElement;
            const parent = currentResizer.parentElement.parentElement;
            let p;
            let c;
            let original_w = 0;
            let original_h = 0;
            let parent_x = 0;
            let parent_y = 0;
            let child_x = 0;
            let child_y = 0;
            let mouse_x = 0;
            let mouse_y = 0;
            let scale_x = 0;
            let scale_y = 0;
            // Mouse events
            currentResizer.addEventListener('mousedown', function (e) {
                first(e);
                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
                e.preventDefault();
            });
            // Log
            function log(e) {
                var str = 'original_w[' + original_w + '] original_h[' + original_h + '] \n' +
                    'parent_x[' + parent_x + '] parent_y[' + parent_y + '] \n' +
                    'child_x[' + child_x + '] child_y[' + child_y + '] \n' +
                    'scale_x[' + scale_x + '] scale_y[' + scale_y + '] \n' +
                    'mouse_x[' + mouse_x + '] mouse_y[' + mouse_y + '] \n' +
                    'e.pageX[' + e.pageX + '] e.pageY[' + e.pageY + '] \n' +
                    'obj.left[' + element.style.left + '] obj.top[' + element.style.top + ']';
                console.log(str);
                /**/
            }
            // First location & width
            function first(e) {
                c = element.getBoundingClientRect();
                child_y = c.top;
                child_x = c.left;
                p = parent.getBoundingClientRect();
                parent_y = p.top;
                parent_x = p.left;
                original_w = parseFloat(c.width).toFixed(2);
                original_h = parseFloat(c.height).toFixed(2);
                scale_y = parseFloat(c.height / element.offsetHeight).toFixed(2);
                scale_x = parseFloat(c.width / element.offsetWidth).toFixed(2);
                mouse_y = e.pageY;
                mouse_x = e.pageX;
                log(e);
            }
            // Resize process
            function resize(e) {
                element.style.position = "absolute";
                if (currentResizer.classList.contains('se')) {
                    const width = e.pageX - child_x;
                    const height = e.pageY - child_y;
                    if (width > min) {
                        element.style.width = (width / scale_x) + 'px';
                    }
                    if (height > min) {
                        element.style.height = (height / scale_y) + 'px';
                    }
                }
                else if (currentResizer.classList.contains('sw')) {
                    const width = original_w - (e.pageX - child_x);
                    const height = e.pageY - child_y;
                    if (height > min) {
                        element.style.height = (height / scale_y) + 'px';
                    }
                    if (width > min) {
                        element.style.left = e.pageX - parent_x + 'px';
                        element.style.width = (width / scale_x) + 'px';
                    }
                }
                /* else if (currentResizer.classList.contains('ne')) {
                     const width = e.pageX - child_x;
                     const height = original_h - (e.pageY - mouse_y);
                     if (width > min) {
                         element.style.width = (width / scale_x) + 'px';
                     }
                     if (height > min) {
                         element.style.height = (height / scale_y) + 'px';
                         element.style.top = e.pageY - parent_y + 'px';
                     }
                 }
                else if (currentResizer.classList.contains('nw')) {
                    const width = original_w - (e.pageX - child_x);
                    const height = original_h - (e.pageY - mouse_y);
                    if (width > min) {
                        element.style.left = e.pageX - parent_x + 'px';
                        element.style.width = (width / scale_x) + 'px';
                    }
                    if (height > min) {
                        element.style.height = (height / scale_y) + 'px';
                        element.style.top = e.pageY - parent_y + 'px';
                    }
                }*/
                else if (currentResizer.classList.contains('e')) {
                    const width = e.pageX - child_x;
                    if (width > min) {
                        element.style.width = (width / scale_x) + 'px';
                    }
                }
                else if (currentResizer.classList.contains('s')) {
                    const height = e.pageY - child_y;
                    if (height > min) {
                        element.style.height = (height / scale_y) + 'px';
                    }
                }
                else if (currentResizer.classList.contains('w')) {
                    const width = original_w - (e.pageX - child_x);
                    if (width > min) {
                        element.style.width = (width / scale_x) + 'px';
                        element.style.left = (e.pageX - parent_x) + 'px';
                    }
                }
                else if (currentResizer.classList.contains('n')) {
                    const height = original_h - (e.pageY - mouse_y);
                    if (height > min) {
                        element.style.height = (height / scale_y) + 'px';
                        element.style.top = e.pageY - parent_y + 'px';
                    }
                }
                log(e);
            }
            // When mouse released stop
            function stopResize(e) {
                resizeFlag= false;
                first(e);
                document.removeEventListener('mousemove', resize);
                
            }
        }
    }



    return (
        <div style={{
            height: "80%",
            width: "80%",
            marginTop: "20px",
            marginLeft: "30px"
        }}>

            <div
                className="holder"
                style={{
                    marginTop: "30px",
                    display: "inline-block"
                }}
            >
                <div className="regular"
                  //  onMouseDown={initialiseDrag}
                    ref={textCssRef}
                    contentEditable="true"
                    style={{
                        outline:
                            " 0px solid transparent ",
                        //  cursor: "move"
                    }}

                    onClick={() => {
                        resizeable()
                        //setResizeFlag(true)
                    }}
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key === "Z" || e.ctrlKey && e.key === "z" ||
                            e.ctrlKey && e.key === "A" || e.ctrlKey && e.key === "a"
                        ) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                    }
                    onInput={() => {
                        neRef.current.style.cursor = "pointer"
                        textCssRef.current.style.border = "3px  solid #4286f4"

                        nwRef.current.style.backgroundColor = "black"
                        neRef.current.style.backgroundColor = "red"
                        swRef.current.style.backgroundColor = "#4286f4"
                        seRef.current.style.backgroundColor = "#4286f4"
                        nRef.current.style.backgroundColor = "#4286f4"
                        sRef.current.style.backgroundColor = "#4286f4"
                        wRef.current.style.backgroundColor = "#4286f4"
                        eRef.current.style.backgroundColor = "#4286f4"
                        nwRef.current.style.border = "1px solid"

                        neRef.current.style.border = "1px solid";
                        swRef.current.style.border = "1px solid";
                        seRef.current.style.border = "1px solid";
                        nRef.current.style.border = "1px solid";
                        sRef.current.style.border = "1px solid";
                        wRef.current.style.border = "1px solid";
                        eRef.current.style.border = "1px solid";

                    }}
                    onMouseEnter={() => {

                        neRef.current.style.cursor = "pointer"
                        textCssRef.current.style.border = "3px  solid #4286f4"

                        nwRef.current.style.backgroundColor = "black"
                        neRef.current.style.backgroundColor = "red"
                        swRef.current.style.backgroundColor = "#4286f4"
                        seRef.current.style.backgroundColor = "#4286f4"
                        nRef.current.style.backgroundColor = "#4286f4"
                        sRef.current.style.backgroundColor = "#4286f4"
                        wRef.current.style.backgroundColor = "#4286f4"
                        eRef.current.style.backgroundColor = "#4286f4"
                        nwRef.current.style.border = "1px solid"

                        neRef.current.style.border = "1px solid";
                        swRef.current.style.border = "1px solid";
                        seRef.current.style.border = "1px solid";
                        nRef.current.style.border = "1px solid";
                        sRef.current.style.border = "1px solid";
                        wRef.current.style.border = "1px solid";
                        eRef.current.style.border = "1px solid";

                    }}


                    onMouseLeave={() => {
                        //textRef.setAttribue('contentEditable', 'false')
                        textCssRef.current.style.border = "transparent"

                        nwRef.current.style.backgroundColor = "transparent"
                        neRef.current.style.backgroundColor = "transparent"
                        swRef.current.style.backgroundColor = "transparent"
                        seRef.current.style.backgroundColor = "transparent"
                        nRef.current.style.backgroundColor = "transparent"
                        sRef.current.style.backgroundColor = "transparent"
                        wRef.current.style.backgroundColor = "transparent"
                        eRef.current.style.backgroundColor = "transparent"
                        nwRef.current.style.border = "none"
                        neRef.current.style.border = "none";
                        swRef.current.style.border = "none";
                        seRef.current.style.border = "none";
                        nRef.current.style.border = "none";
                        sRef.current.style.border = "none";
                        wRef.current.style.border = "none";
                        eRef.current.style.border = "none";
                    }}
                >
                    <div className="previewHeader"
                        style={{ maxWidth: "80%", cursor: "move" }}
                        ref={textRef}

                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === "Z" || e.ctrlKey && e.key === "z" ||
                                e.ctrlKey && e.key === "A" || e.ctrlKey && e.key === "a"
                            ) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }
                        }
                    >
                        Enter your text
                    </div>

                    <div className="nw" ref={nwRef}
                        onDragStartCapture={()=>{
                            resizeFlag=false;
                            dragFlag=false
                            rotateHandle()
                        }}
                       // onDrop={()=>{console.log("dffd")}}
                        onMouseLeave={()=>{setStopRotate(true)}}
                        style={{
                            height: "15px",
                            width: "15px",
                            cursor: "move",
                        }}></div>
                    <div className="ne" ref={neRef} style={{
                        cursor: "pointer",
                        height: "15px",
                        width: "15px"
                    }}

                        onClick={() => {
                            textCssRef.current.style.border = "none"
                            nwRef.current.style.backgroundColor = "transparent"
                            neRef.current.style.backgroundColor = "transparent"
                            swRef.current.style.backgroundColor = "transparent"
                            seRef.current.style.backgroundColor = "transparent"
                            nRef.current.style.backgroundColor = "transparent"
                            sRef.current.style.backgroundColor = "transparent"
                            wRef.current.style.backgroundColor = "transparent"
                            eRef.current.style.backgroundColor = "transparent"
                            nwRef.current.style.border = "none"
                            neRef.current.style.border = "none";
                            swRef.current.style.border = "none";
                            seRef.current.style.border = "none";
                            nRef.current.style.border = "none";
                            sRef.current.style.border = "none";
                            wRef.current.style.border = "none";
                            eRef.current.style.border = "none";

                        }}> </div>
                    <div className="sw" ref={swRef}></div>
                    <div className="se" ref={seRef}></div>
                    <div className="n" ref={nRef}></div>
                    <div className="s" ref={sRef}></div>
                    <div className="w" ref={wRef}></div>
                    <div className="e" ref={eRef}></div>
                </div>
            </div>


        </div >
    )
}

export default Card;