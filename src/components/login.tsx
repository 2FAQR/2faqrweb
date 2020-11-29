import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { JWT_TOKEN, USERNAME_KEY } from '../constants';
import { SERVER_BASE_URL } from '../config';

export interface LoginResponse {
  status: string;
  message: string;
  Authorization: string;
}

const LoginComponent = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
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
  ): Promise<LoginResponse | undefined> => {
    try {
      const response: Response = await fetch(SERVER_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'password',
        }),
      });
      const loginResponse: LoginResponse = await response.json();
      return loginResponse;
    } catch (error) {
      console.warn(error.message);
    } finally {
      console.log('Login Function finished');
    }
  };

  const submitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(username + ' ' + password);
    loginUser(username, password).then(
      (loginResponse: LoginResponse | undefined) => {
        if (loginResponse) {
          sessionStorage.setItem(JWT_TOKEN, loginResponse.Authorization);
          console.log(loginResponse.message);
        }
      }
    );
    const { sessionStorage } = window;
    if (username) {
      sessionStorage.setItem(USERNAME_KEY, username);
    }
    history.push('/loginqr');
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
