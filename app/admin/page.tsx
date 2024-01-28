'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useCookies } from 'next-client-cookies';

interface User {
  ghId: number;
  name: string;
  oauth: string;
}
export default function AdminPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const cookie = useCookies();

  React.useEffect(() => {
    var login = cookie.get("user");
    var password = cookie.get("password");
    fetch(process.env.NEXT_PUBLIC_MY_URL + "/api/admin", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login: login, password: password })
    }).catch((error) => { }).then((response) => {
      if (response)
        return response.json()
    }).then((users) => {
      setUsers(users.ghUsers)
    });
  }, []);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <Typography variant="h3" component="h3" color='primary'>
      Tabela de tokens doados
    </Typography>
    <br />
      {
        (users && users.length > 0) &&
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="">
          <TableHead>
            <TableRow>
              <TableCell sx={{color: 'white'}}>Nome</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>Id do GitHub</TableCell>
              <TableCell align="right" sx={{color: 'white'}}>Token</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow
                key={user.ghId}
                sx={{ '&:last-child td, &:last-child th': { border: 0, color: '#68b2b1', backgroundColor: 'white' } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.ghId}</TableCell>
                <TableCell align="right">{user.oauth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{color: '#68b2b1', backgroundColor: 'white'} }
      />
      </TableContainer>
      }
    </Box>
  );
}
