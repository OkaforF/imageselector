import React, {useEffect, useRef, useState} from 'react';
import sofa from './sofa.png';
import './App.css';
import Aside from './Aside'

function App() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({});
  const [endCoordinates, setEndCoordinates] = useState({});
  const [cropSize, setCropSize] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [croppedImgs, setCroppedImgs] = useState([]);

  const handleMouseDown = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    setMouseCoordinates({x:offsetX, y:offsetY})
    setIsDrawing(true);
  }

  const handleMouseMove = ({nativeEvent}) => {
    if(!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    let width = offsetX - mouseCoordinates.x;
    let height = offsetY - mouseCoordinates.y;
    setEndCoordinates({endX:offsetX, endY:offsetY})
    setCropSize({width:width, height:height})
  }

  const handleMouseUp = () => {
    setIsDrawing(false);
  }

  const addImage = () => {
    const canvas = canvasRef.current;
    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    contextRef.current =  ctx;
    let imageObj = new Image();
    imageObj.onload = () => {
      let newImg;
      let width = canvas.width;
      let nw = imageObj.naturalWidth;
      let nh =  imageObj.naturalHeight;
      //aspect ratio width:height
      let aspect = nw / nh;
      let height = width / aspect;
      canvas.height = height;
      newImg = ctx.drawImage(imageObj, mouseCoordinates.x, mouseCoordinates.y, cropSize.width, (cropSize.height/aspect), 0, 0, width, height)
    } 
    imageObj.src = sofa;
  }
  return (
    <div className="App">
      <div className="container">
        <div className="img-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}>
        <div className="cropping-box"
          style={{top:mouseCoordinates.y, left:mouseCoordinates.x, 
          height:cropSize.height, width:cropSize.width}}>
        </div>
          <img src={sofa} className="App-logo" alt="logo" />
        </div>
          <Aside canvasRef={canvasRef} addImage={addImage}/>
      </div>     
    </div>
  );
}

export default App;