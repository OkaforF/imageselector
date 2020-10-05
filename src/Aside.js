import React from 'react';
import './App.css';

const Aside = ({canvasRef, addImage}) => {
  return (
    <div className="aside">
    <div className="img-placeholder-container">
      <div class="cropped-img">
        <canvas id="canvas" className="img-placeholder"
        ref={canvasRef}></canvas>
        <div className="img-info">
          <p className="img-name">Shot 1</p>
          <p className="img-size">512 x 512</p>
        </div>
      </div>
        <button className="add-image"
        onClick={addImage}>Add</button>  
    </div>    
  </div>
  );
}

export default Aside;