import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SERVER_BASE_URL } from "../config";
import { JWT_TOKEN, USERNAME_KEY } from "../constants";

export interface RegisterResponse {
  status: string;
  message: string;
  Authorization: string;
}

const RegisterComponent = () => {
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

  const registerUser = async (
    username: string,
    password: string
  ): Promise<RegisterResponse | undefined> => {
    try {
      const response: Response = await fetch(SERVER_BASE_URL + "/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          password: password,
          username: username,
          public_id: username,
        }),
      });
      const registerResponse: RegisterResponse = await response.json();
      return registerResponse;
    } catch (error) {
      console.warn(error.message);
    } finally {
      console.log("Login Function finished");
    }
  };

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(username + " " + password);
    registerUser(username, password)
      .then((registerResponse: RegisterResponse | undefined) => {
        if (registerResponse) {
          sessionStorage.setItem(JWT_TOKEN, registerResponse.Authorization);
          sessionStorage.setItem(USERNAME_KEY, username);
          console.log(registerResponse.message);
        }
      })
      .finally(() => {
        history.push("/registerqr");
      });
  };
  const checkIfRegistered = async (token: string) => {
    try {
      const res = await fetch(SERVER_BASE_URL + "/qrcode/checkifregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return await res.status;
    } catch (error) {
      console.warn(error);
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
      <Button onClick={submitHandler}>Register</Button>
    </>
  );
};

export default RegisterComponent;
