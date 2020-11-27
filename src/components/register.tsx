import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const RegisterComponent = () => {
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
    history.push("/registerqr");
  };
  return (
    <>
      <TextField label="Username" onChange={usernameChangeHandler} />
      <TextField
        label="Password"
        onChange={passwordChangeHandler}
        type="password"
      />
      <Button onClick={submitHandler}>Register</Button>
      <Typography>{username}</Typography>
      <Typography>{password}</Typography>
    </>
  );
};

export default RegisterComponent;
