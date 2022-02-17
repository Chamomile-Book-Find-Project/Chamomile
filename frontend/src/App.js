import React ,{useState}from "react";
import Header from "./components/Header";
import "./App.css";
import BookParsing from "./components/BookParsing";
import InputButton from "./components/InputButton";
// import Container from "./components/Container"
   // const [input, setinput] = useState(false)


function App () {

  const [input, setinput] = useState(false)

    return (
      
        <div className="App">
          <Header></Header>
          <InputButton setinput={()=>setinput(true)}></InputButton>
           {input && <BookParsing status={input}></BookParsing>}
          {/* <Container></Container> */}
        </div>
    );

}

export default App;
