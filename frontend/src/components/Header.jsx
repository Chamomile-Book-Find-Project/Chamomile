import React, { Component } from "react";
import Bannerlogo from "./images/Bannerlogo.png";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "3rem",
          padding: "0.5rem",
          backgroundColor: "#C5CBD6",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundImage:
              " linear-gradient(to bottom, #C5CBD6 0%,#839DBB 100%)",
            height: "5rem",
            width: "100%",
            padding: "1rem",
          }}
        >
          <img
            src={Bannerlogo}
            style={{
              height: "50px",
            }}
            alt="Logoimg"
          />
        </div>
        <div
          style={{ 
            width: "50px",
            height: "50px",
            color: "black",
          }}
        ></div>
      </div>
    );
  }
}

export default Header;
