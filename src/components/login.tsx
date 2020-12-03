import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { JWT_TOKEN, USERNAME_KEY } from "../constants";
import { SERVER_BASE_URL } from "../config";

const LoginComponent = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const history = useHistory();
  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<any> => {
    try {
      const response: Response = await fetch(SERVER_BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      return await response.json();
    } catch (error) {
      console.warn(error.message);
    } finally {
      console.log("Login Function finished");
    }
  };

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    loginUser(username, password).then((loginResponse) => {
      if (loginResponse) {
        sessionStorage.setItem(JWT_TOKEN, loginResponse["Authorization"]);
        console.log(loginResponse.message);
        history.push("/loginqr");
      }
    });
    const { sessionStorage } = window;
    if (username) {
      sessionStorage.setItem(USERNAME_KEY, username);
    }
  };
  return (
    <>
      <TextField label='Username' onChange={usernameChangeHandler} />
      <TextField
        label='Password'
        onChange={passwordChangeHandler}
        type='password'
      />
      <Button onClick={submitHandler}>Login</Button>
      <Typography>{username}</Typography>
      <Typography>{password}</Typography>
    </>
  );
};

export default LoginComponent;
