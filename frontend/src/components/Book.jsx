import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import "./Book.css";

//화면에 보여져야 하는 값들 정리해서 넘겨주는 것

function Book({ Category, Title, Writer, Bookmade, Sellprice, ImageUri }) {
  console.log(ImageUri);
  return (
    <div classname="Book__data">
      <div className="box2">
        <div className="miniImg">
          <img
            classname="Book__Image__uri"
            src={ImageUri}
            // style={{
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)",
            //   float: "left",
            // }}
            alt="책이미지"
          />
        </div>
      </div>
        <div className="miniBox1">
          <h2 classname="Book__Category">카테고리 : {Category}</h2>
          <h2 classname="Book__title">제목 : {Title} </h2>
          <h2 classname="Book__writer">글쓴이 : {Writer}</h2>
          <h2 classname="Book__made">출판사 : {Bookmade}</h2>
          <h2 classname="Book__Sell__price">판매가 : {Sellprice}원</h2>
        </div>
    </div>
  );
}
Book.propTypes = {
  Category: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Writer: PropTypes.string.isRequired,
  Bookmade: PropTypes.string.isRequired,
  Sellprice: PropTypes.string.isRequired,
  ImageUri: PropTypes.string.isRequired,
};

export default Book;
