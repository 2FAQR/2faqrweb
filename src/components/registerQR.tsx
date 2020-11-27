import QRCode from "react-qr-code";
import React from "react";

const RegisterQR = () => {
  const val: string = "Rohit____asdfjkl;!asdfkj;";
  return <QRCode value={val} />;
};

export default RegisterQR;
