import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
// import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      {/* <Layout></Layout> */}
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
