import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Divider } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';

const drawerWidth = 240;

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#68b2b1"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <ButtonGroup
          orientation="vertical"
          variant="text"
          size='large' color='primary'
        >
          <Button><HomeIcon /> Home</Button>
          <Button><AdminPanelSettingsIcon /> Admin</Button>
        </ButtonGroup>

        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Typography variant="h1" component="h2">
          {process.env.NEXT_PUBLIC_TITLE}
        </Typography>
        <Typography paragraph>
          {process.env.NEXT_PUBLIC_MESSAGE}
        </Typography>
      </Box>
    </Box>
  )
}
