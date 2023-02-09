import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Title from '../common/Title'

export function Summary() {

  return (
    <React.Fragment>
      <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 240 }}>
        <Title>Mission</Title>
        <Grid className='mission' justifyContent="center" container sx={{ mt: 4 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <picture><img className="logo-claim" src="/assets/images/our-mission.png" /></picture>
        </Grid>
        <Typography color="#1976d2" variant="h6" component="h2">Full Tank For Less Money</Typography>
      </Paper>
    </React.Fragment>
  )
}
