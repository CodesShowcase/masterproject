import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { BestPrices } from './BestPrices'
import { Stations } from './Stations'

// Preferred location & logout after login!

export default function Home() {

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
          <BestPrices />
          <Stations />
        </Grid>
      </Container>
    </Box>
  )
}
