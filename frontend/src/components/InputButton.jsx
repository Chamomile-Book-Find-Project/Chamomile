import { useState } from "react";
import React, { Component, useRef } from "react";
import CameraIcon from "./images/cameraIcon.png";

function InputButton() {
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
          padding: "8rem",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "6rem",
            height: "6rem",
            color: "black",
            cursor: "pointer",
          }}
          onClick={handleUploadButtonClick}
        >
          <img
            src={CameraIcon}
            style={{
              height: "50px",
            }}
            alt="CameraButton"
          />
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
          {imageSrc && <img src={imageSrc} alt="preview-img" width={"198px"} height={"293px"}/>}
        </div>
      </div>
    </main>
  );
}
export default InputButton;
