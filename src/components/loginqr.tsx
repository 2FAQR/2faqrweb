import QRCode from "react-qr-code";
import React from "react";
import { Typography } from "@material-ui/core";
import { USERNAME_KEY } from "../constants";

const LoginQR = () => {
  const val: string = "name____ROhit Jain";
  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    const { sessionStorage } = window;
    const val = sessionStorage.getItem(USERNAME_KEY);
    if (val) {
      setUsername(val);
    }
  }, []);
  return (
    <>
      <QRCode value={val} />
      <Typography>{username}</Typography>
    </>
  );
};

export default LoginQR;
