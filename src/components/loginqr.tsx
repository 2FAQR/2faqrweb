import QRCode from "react-qr-code";
import React from "react";
import { JWT_TOKEN, USERNAME_KEY } from "../constants";
import { useHistory } from "react-router-dom";
import { POLLING_TIME_MILI_SECONDS, SERVER_BASE_URL } from "../config";

const LoginQR = () => {
  const [qrVal, setQrVal] = React.useState<string>("");
  const [hasVerified, setVerified] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
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
  }, [hasVerified, history]);

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

  const getLoginHash = async (token: string) => {
    try {
      const res = await fetch(SERVER_BASE_URL + "/qrcode/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      return await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    const token = sessionStorage.getItem(JWT_TOKEN);
    const username = sessionStorage.getItem(USERNAME_KEY);
    if (token) {
      getLoginHash(token).then((res: { hash: string }) => {
        setQrVal(res.hash + "____" + token + "____" + username);
        setLoading(false);
      });
    }
  }, []);
  return loading ? (
    <div>{"Loading..."}</div>
  ) : (
    <QRCode value={qrVal} size={500} />
  );
};

export default LoginQR;
