import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Button, Checkbox, FormControlLabel, Link, Paper, Typography } from '@mui/material'

export default function LandingPage() {
    const navigate = useNavigate()
    const [skipLandingPage, setSkipLandingPage] = useState((JSON.parse(localStorage.getItem('skip-page') as string) === 'true') ? 'true' : 'false')

    const handleChange = () => {
      const status = (skipLandingPage === 'true') ? 'false' : 'true'
      localStorage.setItem('skip-page', JSON.stringify(status))
      setSkipLandingPage(status)
    }

    useEffect(() => {
      if (skipLandingPage === 'true') {
        navigate('/home')
      }
    }, [skipLandingPage, navigate])

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
        <Grid item xs={12} md={8} lg={8}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography sx={{ mt: 4 }} variant="h4" component="h2">You made it to my final MasterClass Project!</Typography>
            <Typography sx={{ mt: 2 }} >-= This is a demo application with prices from 2022 which is limited to Berlin =-</Typography>
            <Typography sx={{ mt: 2 }} >Full details about the application you will find on GitHub (<Link href="https://github.com/CodesShowcase/masterproject"> =&gt; Link </Link>).</Typography>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" className="landing-grid">
            <Button sx={{ mt: 2 }}variant="contained" href="/home">Take me to the application</Button>
              <FormControlLabel sx={{ mt: 1, ml: 4 }} control={<Checkbox checked={(skipLandingPage === 'true') ? true : false} onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Check here if you want to skip this page and go straight to the application." />
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  )
}