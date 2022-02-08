import React from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/bookParsing";
import InputButton from "./components/InputButton"

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Header></Header>
          <InputButton></InputButton>
          <BookParsing></BookParsing>
        </div>
    );
  }
}

export default App;
