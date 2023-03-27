import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

export default function LandingPage() {

    const [skipLandingPage, setSkipLandingPage] = useState((JSON.parse(localStorage.getItem('landing-page') as string) === 'skip') ? true : false)


      const myStatus = JSON.parse(localStorage.getItem('landing-page') as string) || false

      console.log(myStatus)
    
      const handleToggle = () => {
        
        //setSkipLandingPage(localStorage.setItem('landing-page', JSON.stringify('skip')))

      };
    
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
            <Typography>Test {myStatus.toString()}</Typography>
            <button onClick={handleToggle}>Toggle</button>
        </Grid>
      </Container>
    </Box>
  )
}