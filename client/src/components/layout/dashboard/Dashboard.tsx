import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Statistics } from './Statistics'
import { Summary } from './Summary'
import { Users } from './Users'

export default function Dashboard() {

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        display: 'flex',
        overflow: 'auto',
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} sx={{ display: {xs: 'block', sm: 'block', md: 'none'} }}>
            <Summary />
          </Grid>
          <Statistics />
          <Grid item md={4} lg={4} sx={{ display: {xs: 'none', sm: 'none', md: 'block'} }}>
            <Summary />
          </Grid>
          <Users />
        </Grid>
      </Container>
    </Box>
  )
}
