import React, { useEffect } from "react";
import { fabric } from "fabric";


const FabricExample = () => {
    const fabricRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const video1El = document.getElementById('video1');

    useEffect(() => {
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current);
        };

if(canvasRef.current)
{
        var canvas = new fabric.Canvas('canvas');
       const cDim = document.getElementById("canvas");
       //canvas.backgroundColor="red"
        window.fabric.Image.fromURL(" ", (oImg) => {
            oImg.scaleToWidth(cDim.clientWidth)
            oImg.scaleToHeight(cDim.clientHeight)
            canvas.setBackgroundImage(oImg);
            canvas.renderAll();

        }, { crossOrigin: 'anonymous' });


        var video1 = new fabric.Image(video1El, {
            left: 200,
            top: 300,
            angle: -15,
            originX: 'center',
            originY: 'center',
            objectCaching: false,
        });

        canvas.add(new fabric.Text('RAKCHAMPS AND CO.LLP\nCHARTERS ACCOUNTS', {
            fontFamily: 'Delicious_500',
            fontSize: 10,
            fontWeight: 'bold',
            height: 243,
            width: 600,
            left: 10,
            top: 10
        }));



        canvas.add(video1);
        video1.getElement().play();
        canvas.renderAll();

        document.getElementById('btn').addEventListener('click', function (e) {
            var obj = canvas.getActiveObject();
            console.log("canvas refernce", fabricRef.current)
          
         //   var _canvasObject = document.getElementById("canvas")
            var link = document.createElement("a");
            link.href =  fabricRef.current.toDataURL({ format: 'mp4', multiplier: 4 });
            link.download = "Custom Frame.mp4";
            link.click();

            if (!obj) return;

            canvas.renderAll();
        });


        const disposeFabric = () => {
            fabricRef.current.dispose();
        };

        initFabric();
        

        return () => {
            disposeFabric();
        };
    }
    }, [canvasRef.current]);

    return (
        <>
          
           


            <button id="btn">save</button>
            <canvas ref={canvasRef} id="canvas" height="400px" width="400px" />
        </>)
};

export default FabricExample;
