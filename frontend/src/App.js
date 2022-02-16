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
    const {input, setinput} = this.state
    return (
      
        <div className="App">
          <Header></Header>
          <InputButton setinput={()=>setinput(true)}></InputButton>
           {input && <BookParsing status={input}></BookParsing>}
          {/* <Container></Container> */}
        </div>
    );
  }
}

export default App;
