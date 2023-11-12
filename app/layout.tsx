import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import Head from 'next/head';
import SideDrawer from '@/components/sideDrawer';
import { ClientCookiesProvider } from '@/components/cookiesProvider';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Git Token Donation'
};

const DRAWER_WIDTH = 240;

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-BR">
      <Head>
      </Head>
      <body>

        <ClientCookiesProvider value={cookies().getAll()}>
          <ThemeRegistry>
            <SideDrawer></SideDrawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                ml: `${DRAWER_WIDTH}px`,
                p: 3,
              }}
            >
              {children}
            </Box>
          </ThemeRegistry>
        </ClientCookiesProvider>
      </body>
    </html >
  );
}
