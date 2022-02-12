//얘를 InputButton에 흩뿌려줘야 함

import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [files, setFiles] = useState({
    imageURL: "",
  });

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
    <div>
      <form method="post" onSubmit={handleUploadImage}>
        <div>
          <input type="file" />
        </div>
        <div>
          <button>Upload</button>
        </div>
      </form>
    </div>
  );
}

export default FileUpload;