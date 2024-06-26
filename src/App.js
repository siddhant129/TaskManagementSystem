import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { SignUp } from "./Components/SignUp";
import { Chat } from "./Components/Teams/Chat";
import { Home } from "./Components/Home";

function App() {
  const data = localStorage.getItem("data");

  return (
    <>
      <Router>
        <Routes>
          {!data && <Route exact path="/" element={<Home />} />}
          {data && <Route exact path="/" element={<Dashboard />} />}
          {data && <Route exact path="/Team" element={<Chat teams={data} />} />}
          <Route exact path="/Dashboard" element={<Dashboard />} />

          <Route exact path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
