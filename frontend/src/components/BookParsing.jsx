import React, { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import Book from "./Book";
import "./Button.css";
import "./BookParsing.css";
import Button from "./images/Button.png";
import CameraIcon from "./images/cameraIcon.png";


// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getBooks() {
  const response = await axios.post("http://localhost:5001/data/result");
  return response.data;
}
function BookParsing2() {
  const [state, refetch] = useAsync(getBooks, [], true);
  const { loading, data: books, error } = state; // state.data 를 books 키워드로 조회
  const [effect, setEffect] = useState("mount1");
  if (loading) return <div>로딩중..</div>;
  if (error) return (
    <div className="box2">
      <div>에러가 발생했습니다</div>
<div className="miniImg">
        <div>에러가 발생했습니다</div>
      </div>
      <div className="miniBox1">
        <div>에러가 발생했습니다</div>
      </div>
    </div>
  );
  if (!books) return <div onClick={refetch}><img src={Button} height="80px" cursor= "pointer"></img></div>;
  return (
    <>
      <div className="books">
        <div className={`box-wrap ${effect}`}>
          {/* <div className="box2"> */}
            <ul>
              {books.result.map((book) => (
                <Book
                  Category={book.Category}
                  Title={book.Title}
                  Writer={book.Writer}
                  Bookmade={book.Bookmade}
                  Sellprice={book.Sellprice}
                  ImageUri={book.ImageUri}
                />
              ))}
            </ul>
          {/* </div> */}
        </div>
      </div>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}
export default BookParsing2;