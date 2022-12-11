import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.targtet;
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
      const { data } = await loginUser({
        varialbes: { ...userData },
      });

      Auth.login(data.loginUser.token);
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
          An error occurred during your attempt to login!
        </Alert>

        <Form.Group>
          <Form.Label style={{ fontSize: "1.5rem" }} htmlFor="email">
            Email
          </Form.Label>
          <Form.Control
            style={{ fontSize: "1.75rem" }}
            type="text"
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
          disabled={!(userData.email && userData.password)}
          type="submit"
          variant="success"
        >
          Log In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
