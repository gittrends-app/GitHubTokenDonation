'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
var cookie = require("@boiseitguru/cookie-cutter");

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    cookie.set("user", user)
    cookie.set("password", password)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' color='primary'>Login</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <TextField id="user" fullWidth label="User" variant="filled" value={user} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUser(event.target.value); console.log(event.target.value) }} />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <FormControl variant="filled"
            fullWidth >
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); console.log(event.target.value) }}
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Ver senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained"  href='/admin' fullWidth size='large' onClick={handleLogin}>Logar</Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <div >
        <br />
      </div>
    </Box>
  );
}
