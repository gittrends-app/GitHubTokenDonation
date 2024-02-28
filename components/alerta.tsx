"use client";

import * as React from "react";
import { Alert, AlertTitle, Box, SxProps } from "@mui/material";
import { useCookies } from "next-client-cookies";

export default function Alerta(props: { sx: SxProps }) {
  const [logged, setLogged] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [user, setUser] = React.useState({ name: "", ghId: "", token: "" });
  const cookie = useCookies();

  React.useEffect(() => {
    var userPlainText = cookie.get("ghUser");
    if (userPlainText) {
      setUser(JSON.parse(userPlainText));
      sucesso();
    }
  }, []);

  function sucesso() {
    setLogged(true);
    setError(false);
    setErrorMsg("");
  }

  return (
    <Box>
      {logged && (
        <Alert severity="success" {...props}>
          <AlertTitle>
            {user.name}, {process.env.NEXT_PUBLIC_THANKS_TITLE}{" "}
          </AlertTitle>
          {process.env.NEXT_PUBLIC_THANKS_MESSAGE}
        </Alert>
      )}
      {error && (
        <Alert severity="error" {...props}>
          <AlertTitle>{process.env.NEXT_PUBLIC_ERROR_TITLE}</AlertTitle>
          {errorMsg != "" ? errorMsg : process.env.NEXT_PUBLIC_UNEXPECTED_ERROR_MESSAGE}
        </Alert>
      )}
    </Box>
  );
}
