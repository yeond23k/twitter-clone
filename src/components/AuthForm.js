import { authService } from "fbase";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 30px;
  max-width: 320px;
  margin-bottom: 10px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 1);
  color: black;
`;
const Submit = styled.input`
  border-radius: 30px;
  padding: 10px;
  width: 100%;
  max-width: 320px;
  text-align: center;
  margin-bottom: 10px;
  color: white;
  background-color: #04aaff;
  cursor: pointer;
`;
const LinkButton = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #04aaff;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const AuthForm = () => {
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(event.target.name);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Submit
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </Form>
      <LinkButton onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </LinkButton>
    </>
  );
};

export default AuthForm;
