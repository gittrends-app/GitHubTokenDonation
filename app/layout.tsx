import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";
import { ClientCookiesProvider } from "@/components/cookiesProvider";
import { cookies } from "next/headers";

import "./globals.css";

import SideDrawer from "@/components/sideDrawer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/context/client-provider";

export const metadata = {
  title: "Git Token Donation",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR">
      <body>
        <ThemeRegistry>
          <ClientCookiesProvider value={cookies().getAll()}>
            <SessionProvider session={session}>
              <SideDrawer />
              <Box
                component="main"
                sx={{
                  bgcolor: "background.default",
                  ml: { xs: 0, md: "240px" },
                  width: { xs: "100%", md: "calc(100% - 240px)" },
                  paddingTop: "25px",
                  paddingX: { xs: "1%", md: "5%", lg: "10%" },
                  margin: "auto",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {children}
              </Box>
            </SessionProvider>
          </ClientCookiesProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
