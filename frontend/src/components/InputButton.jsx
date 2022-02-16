import React, { useRef, useState } from "react";
import CameraIcon from "./images/cameraIcon.png";
// import bookImg from "./images/bookImg.png";
import "./Button.css";
import axios from "axios"; 

// 수정 
function InputButton(setinput) {
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
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const API_UPLOAD_URL = "http://localhost:5001/data/upload";
   axios
      .post(API_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Test Success:", res);
        console.log("Test Success:", res.data);
      setinput()

        // setFiles(`http://localhost:5001/data/upload/${body.file}`);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };

  return (
    <main className="container">
      <div
        style={{
          width: "100%",
          height: "100%",
          // padding: "9rem",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div
          className="box"
          style={{
            position: "relative",
          }}
        >
          <div class="sizeChange">
            <a href="#">
              <img
                src={CameraIcon}
                style={{
                  position: "absolute",
                  top: "49%",
                  left: "50%",
                  width: "20%",
                  minWidth: "70px",
                  cursor: "pointer",
                }}
                alt="CameraButton"
                onClick={handleUploadButtonClick}
              />
            </a>
          </div>
        </div>
      </div>
      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
          setFiles(e.target.files);
          handleUploadImage(e);
        }}
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        multiple
        ref={photoInput}
        style={{ display: "none" }} //업로드 버튼 커스터마이징할 수 있게 본래의 버튼 안 보이도록
      />
      <div className="preview">
        {imageSrc && (
          <div className="mount1">
            <div className={`box-wrap ${effect}`}>
              <div
                className="box1"
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={imageSrc}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "198px",
                    height: "293px",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    float: "left",
                  }}
                  alt="preview-img"
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
