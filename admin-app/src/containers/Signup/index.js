import React, { useState } from "react";
import Layout from "../../components/Layout";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../../actions";

const Signup = () => {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  // define state and attach the value with the input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // form submit for signup
  const userSignup = (evt) => {
    evt.preventDefault();

    const userObj = {
      firstName, lastName,email, password
    }

    // dispatch the signup fn
    dispatch( signup(userObj) );

  }

  if( auth.authenticate ) {
    return <Navigate to={'/'} />
  }

  if( user.loading ) {
    return <p>Loading.....!</p>
  }

  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>

                <Input
                  label="Email"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Signup;
