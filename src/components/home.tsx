import React from "react";
import { JWT_TOKEN, USERNAME_KEY } from "../constants";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const Home = () => {
  const history = useHistory();
  const logout = () => {
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(USERNAME_KEY);
    history.go(-2);
  };
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
