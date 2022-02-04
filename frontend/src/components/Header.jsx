import React, { Component } from "react";
import Logo from "./images/logo.png";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "3rem",
          padding: "0.5rem",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundImage:
              " linear-gradient(to bottom, #C7DD7A 0%,#FEEFDD 100%)",
            width: "60px",
            height: "60px",
          }}
        >
          <img
            src={Logo}
            style={{
              width: "50px",
              height: "50px",
            }}
            alt="Logoimg"
          />
        </div>
        <div  style={{
              width: "50px",
              height: "50px",
              color: "black"
            }}>안</div>
      </div>
    );
  }
}

export default Header;
