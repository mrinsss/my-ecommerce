import React from "react";
import Form from "react-bootstrap/Form";

const Input = (props) => {
  return (
    // controlId="formBasicEmail"
    <Form.Group className="mb-3" > 
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default Input;
