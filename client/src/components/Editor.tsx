import React, { useRef, useState, useEffect, } from "react";
import { BiUndo, BiRedo } from "react-icons/bi";
import { toast } from "react-hot-toast";
import CanvasService from "../services/CanvasService";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { ReactSketchCanvasRef } from "react-sketch-canvas/dist/ReactSketchCanvas";

type eType = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
type eForm = React.FormEvent<HTMLInputElement> | any;

interface EditorProps {
  socketRef: any
  roomId?: string
}


const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

const Editor: React.FC<EditorProps> = ({ socketRef }) => {
  const canvasRef : React.Ref<ReactSketchCanvasRef> | undefined = useRef(null);
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState("#000000");
  
  
  const updateDraw = async () => {
    await CanvasService.drawUpdate(socketRef).then(({data})=> {
      canvasRef.current?.loadPaths(data.canvasPath && []);
      console.log(data);
    }).catch((e)=> {
      toast.error(e)
     })
    }
    
    const onDraw = async () => {
      const canvasPath = await canvasRef.current?.exportPaths();
      await CanvasService.draw(socketRef,{
        canvasPath
      });

    }
    
    useEffect(()=> {
      onDraw()
      updateDraw();
    },[]);

  const pickColor = (e: eForm) => {
    setBrushColor(e.target.value);
  };

  const sliderHandler = (e: eForm) => {
    setBrushSize(e.target.value);
  };

  const undoChanges = (e: eForm) => {
    e.preventDefault();
    canvasRef.current?.undo()
    toast.success("Undo done");
  };
  
  const redoChanges = (e: eForm) => {
    e.preventDefault();
    canvasRef.current?.redo()
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
      <div >
      <ReactSketchCanvas
      height="74vh"
      ref={canvasRef}
      style={styles}
      strokeWidth={brushSize}
      strokeColor={brushColor}
      onChange={onDraw}
    />
      </div>
    </>
  );
};

export default Editor;
