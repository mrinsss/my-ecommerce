import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
// import Layout from "./components/Layout";
import PrivateRoute from "./components/HOC/PrivateRoute";

function App() {
  return (
    <div className="App">
      {/* <Layout></Layout> */}
      <Router>
        <Routes>
          {/* <Route path="/" exact Component={Home} /> */}
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
          
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
          {/* <PrivateRoute path="/" exact element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
