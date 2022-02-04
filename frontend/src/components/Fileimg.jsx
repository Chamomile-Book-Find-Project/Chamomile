import React, { Component, useRef } from "react";
import CameraIcon from "./images/cameraIcon.png";

function Fileimg() {
  const photoInput = useRef();
  const handleUploadButtonClick = () => photoInput.current?.click();

  return (
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
            width: "50px",
            height: "50px",
          }}
          alt="CameraButton"
        />
      </div>

      <input
        type="file"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        multiple
        ref={photoInput}
        style={{ display: "none" }}
      />
    </div>
  );
}
export default Fileimg;
