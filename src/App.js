import "./App.css";
import { LogInNav } from "./Components/LogInNav";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { SignUp } from "./Components/SignUp";
import { Chat } from "./Components/Teams/Chat";

function App() {
  const data = localStorage.getItem("data");

  return (
    <>
      <Router>
        <Routes>
          {data && <Route exact path="/" element={<Dashboard />} />}
          {data && <Route exact path="/Team" element={<Chat />} />}
          <Route exact path="/Dashboard" element={<Dashboard />} />

          <Route exact path="/SignUp" element={<SignUp />} />
          {!data && <Route exact path="/" element={<LogInNav />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
