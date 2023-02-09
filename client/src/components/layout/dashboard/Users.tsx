import * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Title from '../common/Title'
import { REST_API } from '../../../utils/constants'

export type Dash = {
  id: number
	firstname: string
	lastname: string
	username: string
	email: string
	userlevel: string
	created: string
	pending: boolean
	suspended: boolean
}


export function Users() {

  const [users, setUsers] = useState<Dash[]>([])
  //const [err, setErr] = useState('')

  useEffect(() => {
    const getUsers = async () => {
        const user_res = await fetch(`${REST_API}/api/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        const users = await user_res.json()
        setUsers(users)
    }
    getUsers();
  }, [])

  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Users</Title>
          <Table className="station-list" size="small" >
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>First Name</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>Last Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Email</TableCell>
                <TableCell>Usertype</TableCell>
                <TableCell>Created</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' } }}>Pending</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' } }}>Suspended</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                return (
                  <TableRow key={user.id}>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>{user.firstname}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>{user.lastname}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{user.email}</TableCell>
                    <TableCell>{user.userlevel}</TableCell>
                    <TableCell>{user.created.substr(0, 10)}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' } }}>{user.pending ? 'true' : 'false'}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' } }}>{user.suspended ? 'true' : 'false'}</TableCell>
                    <TableCell align='center'><Link to={`/user/${user.id}`}><OpenInNewIcon /></Link></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}
