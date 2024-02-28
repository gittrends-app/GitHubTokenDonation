import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "../components/ThemeRegistry/ThemeRegistry";
import SideDrawer from "@/components/sideDrawer";
import { ClientCookiesProvider } from "@/components/cookiesProvider";
import { cookies } from "next/headers";

import "./globals.css";

export const metadata = {
  title: "Git Token Donation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientCookiesProvider value={cookies().getAll()}>
          <ThemeRegistry>
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
          </ThemeRegistry>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
