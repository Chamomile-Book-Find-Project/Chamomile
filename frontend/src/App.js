import React ,{useState}from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/BookParsing";
import InputButton from "./components/InputButton";
// import Container from "./components/Container"
   // const [input, setinput] = useState(false)
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { 
      input : false ,
      setinput : false
    };
  }

  render() {
    return (
      
        <div className="App">
          <div className="Header">
          <Header></Header>
          </div>
          <div className="Body">
          <InputButton></InputButton>
          <BookParsing></BookParsing>
          </div>
          {/* <Container></Container> */}
        </div>
    );
  }
}

export default App;
