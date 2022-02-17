import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/BookParsing";
import InputButton from "./components/InputButton";
// import Container from "./components/Container"
// const [input, setinput] = useState(false)
function App() {
  return (
    <div className="App">
      <Header></Header>
      <InputButton></InputButton>
      <BookParsing></BookParsing>
      {/* <Container></Container> */}
    </div>
  );
}
export default App;