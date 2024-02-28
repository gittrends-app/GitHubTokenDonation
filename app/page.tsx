"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Alerta from "@/components/alerta";
import Image from "next/image";
import { useCookies } from "next-client-cookies";

export default function HomePage() {
  const cookie = useCookies();

  function handleLogin() {
    if (!cookie.get("ghUser")) {
      window.location.assign(
        "" +
          process.env.NEXT_PUBLIC_GH_LOGIN_URL +
          process.env.NEXT_PUBLIC_GH_CLIENT_ID
      );
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Alerta sx={{ margin: "auto", maxWidth: "350px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          color="primary"
          fontWeight="bold"
        >
          {process.env.NEXT_PUBLIC_TITLE}
        </Typography>
        <br />
        <br />
        <Typography variant="h5" component="h5">
          {process.env.NEXT_PUBLIC_MESSAGE}
        </Typography>
      </Box>
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          float: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ color: "white", fontWeight: "bold", fontSize: "1.25rem" }}
          onClick={handleLogin}
        >
          <GitHubIcon style={{ marginRight: 5 }} />
          {process.env.NEXT_PUBLIC_DONATE_BUTTON}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
          flexGrow: 1,
        }}
      >
        <Image
          src="/images/ghpet.png"
          alt="Logo"
          width={240}
          height={240}
        ></Image>
      </Box>
    </Box>
  );
}
