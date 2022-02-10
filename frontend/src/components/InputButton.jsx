import { useState } from "react";
import React, { Component, useRef } from "react";
import CameraIcon from "./images/cameraIcon.png";
import "./Button.css";


function InputButton() {

  //  start
  const [mount, setMount] = useState(false);
    const [effect, setEffect] = useState('mount1');

    // const onClickBtn = () => {
        
    //     if(mount){
    //         setEffect('unmount');
    //         setTimeout(()=>{     
    //             setMount(v=> !v);    
    //         }, 400) 
    //     }else{
    //         setEffect('mount1');
    //         setMount(v=> !v);
    //     }
    // };
// end

  const photoInput = useRef();
  const handleUploadButtonClick = () => photoInput.current?.click();
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  return (
    <main className="container">
      <div 
        style={{
          width: "100%",
          height: "100%",
          padding: "6rem",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "8rem",
            height: "8rem",
            color: "black",
            cursor: "pointer",
          }}
          
          onClick={handleUploadButtonClick}
        >
          {/* <div className="box1"> */}
            <div class="sizeChange">
                 <a href="#">
                    <img
                      src={CameraIcon}
                      style={{
                      height: "50px",
                      }}
                    alt="CameraButton"/>
                  </a>
              {/* </div> */}
            </div>
        </div>
        
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          multiple
          ref={photoInput}
          style={{ display: "none" }}
        />

        <div className="preview">
          {imageSrc && <div className= "mount3">
          <div className={`box-wrap ${effect}`}>
            <div className= "box1"><img src={imageSrc} alt="preview-img" width={"198px"} height={"293px"}/></div></div></div>}
        </div>
      
      </div>
    </main>
  );
}
export default InputButton;
