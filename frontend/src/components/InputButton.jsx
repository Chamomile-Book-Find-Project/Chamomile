import React, { useRef, useState } from "react";
import CameraIcon from "./images/cameraIcon.png";
import "./Button.css";
import axios from "axios";

function InputButton() {
  const [files, setFiles] = useState({
    imageURL: "",
  });
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

  const handleUploadImage = (event) => {
    setFiles(event.target.files);
    console.log(files);

    event.preventDefault();

    const formData = new FormData();
    formData.append("file", files[0]);

    axios.post("http://localhost:80/upload", formData).then((res) => {
      //주소 아직 안 됨
      console.log(res.statusText);
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
        <div
          style={{
            width: "8rem",
            height: "8rem",
            color: "black",
            cursor: "pointer",
          }}
          onClick={handleUploadButtonClick}
        >
          <div className="box">
            <div class="sizeChange">
              <a href="#">
                <div>
                  <br />
                  <br />
                  <br />
                </div>
                <img
                  src={CameraIcon}
                  style={{
                    height: "50px",
                  }}
                  alt="CameraButton"
                />
              </a>
            </div>
          </div>
        </div>
        <form method="post" onSubmit={handleUploadImage}>
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
          <div>
            <button>Upload</button>
          </div>
        </form>
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
      </div>
    </main>
  );
}
export default InputButton;
