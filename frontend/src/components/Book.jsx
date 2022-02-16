import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

//화면에 보여져야 하는 값들 정리해서 넘겨주는 것

function Book({ Category, Title, Writer, Bookmade, Sellprice, ImageUri }) {
  console.log(ImageUri);
  return (
    <div classname="Book__data">
      <img classname="Book__Image__uri" src={ImageUri} alt="책이미지" float="left" />
      <div
        className="miniBox"
        style={{
          position: "relative",
        }}
      >
        <h1 classname="Book__Category">{Category}</h1>
        <h2 classname="Book__title">{Title}</h2>
        <h3 classname="Book__writer">{Writer}</h3>
        <h4 classname="Book__made">{Bookmade}</h4>
        <h5 classname="Book__Sell__price">{Sellprice}</h5>
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
