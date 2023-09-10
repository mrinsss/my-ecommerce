import React from "react";
import Layout from "../../components/Layout";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './style.css';

const Home = () => {
  return (
    <>
      <Layout >
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">Sidebar</Col>
            <Col md={10} style={{marginLeft: 'auto'}}>Container</Col>
          </Row>
        </Container>

      {/* <div
        style={{ margin: "5rem", background: "#FFFFFF" }}
        className="text-center"
      >
        <h1>Welcome to Admin Dashboard</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div> */}
      </Layout>
    </>
  );
};

export default Home;
