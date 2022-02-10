import React from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/bookParsing";
import InputButton from "./components/InputButton";
import Container from "./components/Container"


class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Header></Header>
          <InputButton></InputButton>
          <BookParsing></BookParsing>
          <Container></Container>
        </div>
    );
  }
}

export default App;
