// //juwon 코드 테스트 장소
// import React, { useState, useRef, useEffect } from "react";

// function Container() {
// // function Main(props){
// 	const [imageURL, setImageURL] = useState("");
// // }
// const handleUploadImage= ev=> {
//     ev.preventDefault();
//     const data = new FormData();
//     data.append('file', uploadInput.files[0]);
//     fetch('http://localhost:8000/upload', {
//       method: 'POST',
//       body: data,
//     }).then((response) => {
//       response.json().then((body) => {
//         // setState({ imageURL: `http://localhost:8000/${body.file}` });
        
//         // const [count,setCount] = useState(0);
//   	    // const onClickHandler = e => {
//             setImageURL(`http://localhost:8000/${body.file}`
//         );
//     // }
//     });
//     });
//   }

// return (
//       <form onSubmit={handleUploadImage}>
//         <div>
//           <input ref={(ref) => { uploadInput = ref; }} type="file" />
//         </div>
//         <div>
//           <button>Upload</button>
//         </div>
//         <img src={imageURL} alt="img" />
//       </form>
//     );
// }
//     export default Container;