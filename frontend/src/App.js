import React from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/BookParsing";
import InputButton from "./components/InputButton";
// import Container from "./components/Container"

class App extends React.Component {
  render() {
    const [input, setinput] = usestate(false)
    return (
        <div className="App">
          <Header></Header>
          <InputButton setinput={()=>setinput(true)}></InputButton>
           {input && <BookParsing STATUS={input}></BookParsing>}
          {/* <Container></Container> */}
        </div>
    );
  }
}

export default App;
