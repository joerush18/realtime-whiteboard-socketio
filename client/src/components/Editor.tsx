import React, { useRef, useLayoutEffect, useState, FormEvent } from "react";
import { BiUndo, BiRedo } from "react-icons/bi";
import { toast } from "react-hot-toast";

type eType =React.MouseEvent<HTMLCanvasElement, MouseEvent>;
type eForm = React.FormEvent<HTMLInputElement> | any;

const Editor : React.FC = () => {
  const canvasRef = useRef(null);
  const [draw, setDraw] = useState(false);
  const [c, setC] = useState<CanvasRenderingContext2D | null>();
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState("#000000");

  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas") ;
    const canv = canvas && canvas.getContext("2d");
    setC(canv);
  }, []);

  const handleMouseMove = (e : eType) => {
    if (!draw || !c) return;
    c.lineWidth = brushSize;
    c.lineCap = "round";
    c.strokeStyle = brushColor;
    c.lineTo(e.clientX, e.clientY - 180);
    c.stroke();
  };

  const handleMouseDown = (e : eType) => {
    if(!c) return;
    setDraw(true);
    c.lineWidth = brushSize;
    c.lineCap = "round";
    c.strokeStyle = brushColor;
    c.lineTo(e.clientX, e.clientY - 180);
    c.stroke();
  };
  const handleMouseUp = () => {
    if(!c) return;
    setDraw(false);
    c.beginPath();
  };

  const pickColor = ( e : eForm) => {
    setBrushColor(e.target.value);
  };

  const sliderHandler = (e :eForm ) => {
    setBrushSize(e.target.value);
  };

  const undoChanges = (e : eForm) => {
    e.preventDefault();
    toast.success("Undo done");
  };
  const redoChanges = (e : eForm) => {
    e.preventDefault();
    toast.success("Redo done");
  };

  return (
    <>
      <div className="flex justify-between items-center m-2">
        <div>
          <input
            type="color"
            value={brushColor}
            onInput={pickColor}
            className="h-10 w-24 mx-0"
          />
          <h1 className="text-sm font-bold text-center">Color Picker</h1>
        </div>
        <div className="flex space-x-2">
          <BiUndo
            className="h-8 w-8 border-[1px] rounded-lg hoverEffect"
            onClick={undoChanges}
          />
          <BiRedo
            className="h-8 w-8 border-[1px] rounded-lg hoverEffect"
            onClick={redoChanges}
          />
        </div>
        <div className="ml-2 mt-2">
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            className="w-36"
            onInput={sliderHandler}
          />
          <h1 className="text-sm font-bold">Brush Size: {brushSize}</h1>
        </div>
      </div>
      <hr />
      <canvas
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 180}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="cursor-pointer"
      />
    </>
  );
};

export default Editor;
