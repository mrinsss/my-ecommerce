import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions/auth.actions";

const Header = (props) => {

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch(state => state.auth);
  // bind the logout
  const logout = () => {
    dispatch(signout());
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Signout</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  }


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{zIndex:1}}>
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>

          { auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
