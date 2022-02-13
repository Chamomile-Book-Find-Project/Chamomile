import React, { useRef, useState } from "react";
import CameraIcon from "./images/cameraIcon.png";
import "./Button.css";
import axios from "axios";

function InputButton() {
  const [mount, setMount] = useState(false);
  const [effect, setEffect] = useState("mount1");

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
  
  const [files, setFiles] = useState("");

  const handleUploadImage = (event) => {

    event.preventDefault(); //얘는 새로고침 방지

    const formData = new FormData();
    formData.append("file", files[0]);

    fetch("http://api:001/data/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json().then((body) => {
        setFiles(`http://api:001/data/upload/${body.file}`);
        //주소 아직 안 됨
      });
    });
  };

  return (
    <main className="container">
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "9rem",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div className="box">
          <div class="sizeChange">
              <div>
                <br />
                <br />
                <br />
              </div>
              <img
                src={CameraIcon}
                style={{
                  height: "50px",
                  cursor: "pointer",
                }}
                alt="CameraButton"
                onClick={handleUploadButtonClick}
              />
          </div>
        </div>
      </div>
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            handleUploadImage(e)
          }}
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          multiple
          ref={photoInput}
          style={{ display: "none" }} //업로드 버튼 커스터마이징할 수 있게 본래의 버튼 안 보이도록
        />
      <div className="preview">
        {imageSrc && (
          <div className="mount3">
            <div className={`box-wrap ${effect}`}>
              <div className="box1">
                <div>
                  <br />
                  <br />
                </div>
                <img
                  src={imageSrc}
                  alt="preview-img"
                  width={"198px"}
                  height={"293px"}
                  // flex= {1}
                  // flexDirection={ "column"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default InputButton;
