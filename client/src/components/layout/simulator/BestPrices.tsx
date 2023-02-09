import * as React from 'react'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Title from '../common/Title'
import { REST_API } from '../../../utils/constants'

interface priceKeys {
  [key: string]: string | number;
}

interface prices extends priceKeys{
  e5low: number
  e10low: number
  diesellow: number
}

export function BestPrices() {
  const [bestPrices, setBestPrices] = useState<prices>()

  useEffect(() => {
    const getBestPrices = async () => {
        const response = await fetch(`${REST_API}/api/stats/hourly`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        const result = await response.json()
        result.e5low = (result.e5low/1000).toFixed(2)
        result.e10low = (result.e10low/1000).toFixed(2)
        result.diesellow = (result.diesellow/1000).toFixed(2)
        setBestPrices(result)
    }
    getBestPrices();
  }, [])

  return (
    <Grid item xs={12} md={8} lg={8}>
      <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 240 }}>
        <Title>Last Hour&apos;s Best Prices</Title>
        <Grid container sx={{ mt: 4 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Typography variant="h4" component="h2">E5</Typography>
            <Typography variant="h4" component="h3">{bestPrices?.e5low} €</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" component="h2">E10</Typography>
            <Typography variant="h4" component="h3">{bestPrices?.e10low} €</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" component="h2">Diesel</Typography>
            <Typography variant="h4" component="h3">{bestPrices?.diesellow} €</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
