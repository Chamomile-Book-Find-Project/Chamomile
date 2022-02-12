import { useState } from "react";
import React, { Component, useRef } from "react";
import Bannerlogo from "./images/Bannerlogo.png";
import "./Button.css";

function Header() {
  const photoInput = useRef();
  const [switchOn, switchChange] = useState(false);
  function switchstate() {
    switchChange(!switchOn);
  }
  return (
    <main className="container">
      <div
        style={{
          width: "105%",
          height: "3rem",
          backgroundColor: "#C5CBD6",
          display: "flex",
          position: "fixed",
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
          onClick={switchstate}
        >
          <div class="sizeChange">
            {/* <ul> */}
            {/* <li> */}
            <a href="#">
              <img
                src={Bannerlogo}
                style={{
                  height: "50px",
                }}
                alt="Logoimg"
              />
            </a>
            {/* </li> */}
            {/* </ul> */}
          </div>
        </div>
        <div
          style={{
            width: "50px",
            height: "50px",
            color: "black",
          }}
        ></div>
        <input
          type="file"
          onChange={(e) => {
            window.location.reload();
          }}
          style={{ display: "none" }}
        />
        {switchOn === true ? window.location.reload() : null}
      </div>
    </main>
  );
}
export default Header;
