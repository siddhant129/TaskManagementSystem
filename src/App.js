import logo from "./logo.svg";
import "./App.css";
import { LogInNav } from "./Components/LogInNav";
import { LogInForm } from "./Components/LogIn";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { SignUp } from "./Components/SignUp";
import { Chat } from "./Components/Teams/Chat";
// import "./index.css";

function App() {
  // const [logIn, setLogIn] = useState(false);
  // function logInFn() {
  //   setLogIn(true);
  // }
  // localStorage.setItem("logIn", "");
  const data = localStorage.getItem("data");

  return (
    <>
      <Router>
        <Routes>
          {/* {data && */}

          {data && <Route exact path="/" element={<Dashboard />} />}
          {data && <Route exact path="/Team" element={<Chat />} />}
          {/* } */}
          <Route exact path="/Dashboard" element={<Dashboard />} />

          <Route exact path="/SignUp" element={<SignUp />} />
          {!data && <Route exact path="/" element={<LogInNav />} />}
        </Routes>
      </Router>
      {/* {logIn && (
        <LogIn
          logModal={() => {
            setLogIn(false);
          }}
          submitData={}
        />
      )} */}
    </>
  );
}

export default App;
