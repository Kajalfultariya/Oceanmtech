import React, { useRef, useEffect } from "react";
import { fabric } from 'fabric';


const BigCanFrame = (props) => {

    const item = props?.item
    const data = props?.data

    const BackImage = props?.iname ? props?.iname : "https://oceanmtech.b-cdn.net/dmt/event_file/20220225110005-jb4uck.png"
    const [index, setActiveStep] = React.useState(0);
    const canvas = useRef(null);

    useEffect(() => {
        canvas.current = initCanvas();
        return () => {
            canvas.current.dispose();
            canvas.current = null;
        };

    }, []);
    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: item[index]?.height / 2.6,
            width: item[index]?.width / 2.6,
            selection: false,
            renderOnAddRemove: true,
        })
    );
    useEffect(() => {

        if (canvas.current) {
            var group = new fabric.Group();
            console.log("frmAE", data)

            var xhr = new XMLHttpRequest();
            xhr.open("GET", item[index]?.image, true);
            xhr.responseType = "blob";
            xhr.onload = function (e) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var res = event.target.result;
                    window.fabric.Image.fromURL(res, (oImg) => {
                        oImg.scaleToWidth(500)
                        oImg.scaleToHeight(item[index]?.height / 2.6)
                        oImg.set({
                            left: 0,
                            top: 0,
                            lockMovementX: true,
                            lockMovementY: true
                        })
                        group.addWithUpdate(oImg);

                        //logo
                        /*   var ca = null
                           var m1b = document.createElement("img");
                           m1b.setAttribute('src', data?.logo);
                           ca = new fabric.Image(m1b, {
                               top: 0,
                               left: 0,
                               scaleX: .09,
                               scaleY: .09,
                           });
                           group.add(ca);
   
   */
                        fabric.Image.fromURL(data?.logo, (img) => {

                            var img1 = img.set({
                                left: 0,
                                top: 0,
                                scaleX: .09,
                                scaleY: .09,
                                backgroundColor: "transparent"
                                // width: 100,
                                // height: 100,
                            });

                            // lets define a custom filter:
                            var MyFilter = function (imageData) {
                                const tol = 10;
                                // make all pixels opaque 100%
                                var nPixels = imageData.data.length;
                                const { data } = imageData;
                                for (var i = 0; i < nPixels - 4; i += 4) {
                                    const isWhite =
                                        data[i] > 255 - tol &&
                                        data[i + 1] > 255 - tol &&
                                        data[i + 2] > 255 - tol;
                                    if (isWhite) {
                                        imageData.data[i + 3] = 0;
                                    } else {
                                        // you can replace black with another color
                                    }
                                }
                            };

                            // img1.filters([MyFilter]);
                            //img1.cache();
                            group.addWithUpdate(img1)

                        })



                        canvas.current.add(group);
                        canvas.current.renderAll();
                    }, { crossOrigin: 'anonymous' });
                }
                var file = this.response;
                reader.readAsDataURL(file)
            };
            xhr.send()
        }
    }, [canvas.current])

    useEffect(() => {

        if (BackImage) {

            setTimeout(() => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", BackImage, true);
                xhr.responseType = "blob";
                xhr.onload = function (e) {
                    console.log(this.response);
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var res = event.target.result;
                        //setImageUrl2(res)
                        const cDim = document.getElementById("canvas");
                        window.fabric.Image.fromURL(res, (oImg) => {
                            oImg.scaleToWidth(cDim.clientWidth)
                            oImg.scaleToHeight(cDim.clientHeight)
                            canvas.current.setBackgroundImage(oImg);
                            canvas.current.renderAll();
                        });
                    }
                    var file = this.response;
                    reader.readAsDataURL(file)
                };
                xhr.send()
            }, 50);
        }
    }, [BackImage])



    return (
        <div style={{ border: "solid 1px black", marginTop: "-50px", backgroundColor: "red" }}>

            <canvas id="canvas" />
            <div style={{ height: "50px", width: "100px" }}>
                <div style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent url(" + data?.logo + ") ",
                    //backgroundSize: "cover",
                    backgroundRepeat: "round",
                    //backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%),linear-gradient(-45deg, #ccc 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #ccc 75%),linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    //backgroundSize: "60px 60px",
                 //  backgroundPosition: "0 0, 0 29px, 29px -29px, -29px 0px"
                }}></div>
            </div>
        </div>

    )
}

export default BigCanFrame;