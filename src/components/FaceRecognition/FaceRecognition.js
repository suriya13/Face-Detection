import React from "react";
import './FaceRecognition.css'


const FaceRecognition = (props) => {
    const {imageUrl, box} = props

    return (
        <div className="face-box">
          {}
           <div className="image-box">
             <img id= 'inputImage' alt = '' src={imageUrl} style={{width: '500px', height:'auto'}} />
             <div className="bounding-box" style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
           </div>
        </div>
    )
}

export default FaceRecognition