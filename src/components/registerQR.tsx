import QRCode from "react-qr-code";
import React from "react";
import { JWT_TOKEN } from "../constants";
import { POLLING_TIME_MILI_SECONDS, SERVER_BASE_URL } from "../config";
import { useHistory } from "react-router-dom";

const RegisterQR = () => {
  const [hash, setHash] = React.useState<string>("");
  const [hasVerified, setVerified] = React.useState<boolean>(false);
  const history = useHistory();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (hasVerified) {
        history.push("/home");
        clearInterval(interval);
      }
      const token = sessionStorage.getItem(JWT_TOKEN);
      if (token && !hasVerified) {
        checkIfRegistered(token)
          .then((res: number | undefined) => {
            if (res && res === 200) {
              setVerified(true);
            }
          })
          .catch((error) => {
            console.warn(error);
          });
      }
    }, POLLING_TIME_MILI_SECONDS);
    return () => clearInterval(interval);
  }, [hasVerified]);

  const getHashRegister = async (token: string) => {
    try {
      const response = await fetch(SERVER_BASE_URL + "/qrcode/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return await response.json();
    } catch (error) {
      console.warn(error);
    }
  };
  React.useEffect(() => {
    const token = sessionStorage.getItem(JWT_TOKEN);
    if (token) {
      getHashRegister(token).then((res) => {
        console.log(res.hash);
        setHash(res.hash + "____" + token);
      });
    }
  }, []);

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

  return <QRCode value={hash} />;
};

export default RegisterQR;
