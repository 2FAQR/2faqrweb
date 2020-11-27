import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { USERNAME_KEY } from "../constants";

const LoginComponent = () => {
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
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

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(username + " " + password);
    const { sessionStorage } = window;
    if (username) {
      sessionStorage.setItem(USERNAME_KEY, username);
    }
    history.push("/loginqr");
  };
  return (
    <>
      <TextField label="Username" onChange={usernameChangeHandler} />
      <TextField
        label="Password"
        onChange={passwordChangeHandler}
        type="password"
      />
      <Button onClick={submitHandler}>Login</Button>
      <Typography>{username}</Typography>
      <Typography>{password}</Typography>
    </>
  );
};

export default LoginComponent;
