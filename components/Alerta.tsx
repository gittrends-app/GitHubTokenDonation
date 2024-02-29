"use client";

import * as React from "react";
import { Alert, AlertTitle, Box, SxProps } from "@mui/material";
import { useCookies } from "next-client-cookies";
import { GitHubUser } from "@/app/api/github/route";
import { getGithubProfile } from "@/helpers/github";

export default function Alerta(props: { sx: SxProps }) {
  const [logged, setLogged] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [user, setUser] = React.useState<GitHubUser | undefined>();
  const cookie = useCookies();

  React.useEffect(() => {
    var token = cookie.get("access_token");
    if (token) {
      getGithubProfile(token)
        .then((user) => setUser(user))
        .then(() => {
          setLogged(true);
          setError(undefined);
        })
        .catch((error) => {
          setError(error.message);
          setLogged(false);
        });
    }
  }, [cookie]);

  return (
    <Box>
      {logged && (
        <Alert severity="success" {...props}>
          <AlertTitle>
            {user?.name}, {process.env.NEXT_PUBLIC_THANKS_TITLE}{" "}
          </AlertTitle>
          {process.env.NEXT_PUBLIC_THANKS_MESSAGE}
        </Alert>
      )}
      {error && (
        <Alert severity="error" {...props}>
          <AlertTitle>{process.env.NEXT_PUBLIC_ERROR_TITLE}</AlertTitle>
          {error || process.env.NEXT_PUBLIC_UNEXPECTED_ERROR_MESSAGE}
        </Alert>
      )}
    </Box>
  );
}
