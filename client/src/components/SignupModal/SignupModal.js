import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          An error occurred during your signup!
        </Alert>

        <Form.Group>
          <Form.Label style={{ fontSize: "1.5rem" }} htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            style={{ fontSize: "1.75rem" }}
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleInputChange}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ fontSize: "1.5rem" }} htmlFor="email">
            Email
          </Form.Label>
          <Form.Control
            style={{ fontSize: "1.75rem" }}
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ fontSize: "1.5rem" }} htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            style={{ fontSize: "1.75rem" }}
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          style={{ fontSize: "1.75rem" }}
          disabled={!(userData.username && userData.email && userData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
