import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Title from '../common/Title'
import { ChartGen } from './ChartGen'

function StatisticsContent() {

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
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
              <Title>Last 24h Hours</Title>
              <ChartGen horizon={'hourly'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
              <Title>Last 7 Days</Title>
              <ChartGen horizon={'daily'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
              <Title>Last 12 Weeks</Title>
              <ChartGen horizon={'weekly'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
              <Title>Last 12 Months</Title>
              <ChartGen horizon={'monthly'} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default function Statistics() {
  return <StatisticsContent />;
}
