import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Input from "../../components/UI/Input";

// for store managments
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, login } from '../../actions';
import { Navigate } from "react-router-dom";

const Signin = () => {
  // define state and attach the value with the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const auth = useSelector(state => state.auth); // to get the store value

  const dispatch = useDispatch();

  const userLogin = (evt) => {
    evt.preventDefault();

    const userObj = {
      email, password
    }
    // const userObj = {
    //   email: 'mrinsss@gmail.com',
    //   password: '123456'
    // }

    // dispatch the login fn
    dispatch(login(userObj));
  }

  if( auth.authenticate ) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
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
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}

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

export default Signin;
