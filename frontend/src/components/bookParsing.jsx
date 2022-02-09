import axios from "axios";
import Book from "./Book";
import React, { Components, useState, useEffect } from "react";
import "./Button.css";


function BookParsing() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 books 를 초기화하고
      setError(null);
      setBooks(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get("http://localhost:27000");
      setBooks(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div className="box2"><div>로딩중..</div></div>;
  if (error) return <div className="box2"><div>에러가 발생했습니다</div></div>;

  // 아직 books가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!books) return null;

  // 드디어 books가 성공적으로 받아와 진 상태입니다.
  return (
    <>
    <div className="box2">
            <div class="sizeChange">
                 <a href="#">
                    <ul>
                      {books.map((book) => (
                        <Book
                          key={book.Title}
                          Title={book.Title}
                          Writer={book.Writer}
                          Book_made={book.Book_made}
                          sell_price={book.sell_price}
                          image_uri={book.image_uri}
                        />
                      ))}
                    </ul>
                    <button onClick={fetchBooks}>다시 불러오기</button>
                   </a>
              </div>
          </div>
    </>
  );
}
//button 클릭하면 API 다시 받아옴

export default BookParsing;
