import * as React from 'react'
import { useState } from 'react'
import IFrame from 'react-iframe'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Directions from '@mui/icons-material/Directions'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Title from '../common/Title'
import { Textfield } from '../common/Textfield'
import { GOOGLE_API, REST_API } from '../../../utils/constants'

interface station {
  id: number,
  name: string,
  brand: string,
  street: string,
  house_number: number,
  post_code: number,
  place: string,
  distance: number
  date: string
  e5: number
  e10: number
  diesel: number
  route: string
}

export function Stations() {

  const [stations, setStations] = useState<station[]>([])
  const [gMaps, setGMaps] = useState<string>('https://www.google.com/maps?saddr=berlin&output=svembed')
  const [err, setErr] = useState('')
  const template = 'https://www.google.com/maps?saddr=zsource&daddr=zdestination&dirflg=d&output=svembed'

  console.log(err)

  const theClick = ( newRoute: string ) => {
    return (event: React.MouseEvent) => {
      event.preventDefault()
      setGMaps(newRoute)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      const response = await fetch(`${REST_API}/api/info`, {
        method: 'POST',
        body: JSON.stringify({position: data.get('position')}),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const location: string = data.get('position') as string
      const result = await response.json();
      for (const item in result) {
        result[item].route = template.replace('zsource', location.replace(' ', '+'))
      }
      setGMaps(`https://www.google.com/maps/embed/v1/place?q=${location}&zoom=14&key=${GOOGLE_API}`)
      setStations(result);
    } catch (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setErr(errorMessage)
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={4}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ }}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Title>Fuel Station Locator</Title>
            <Textfield id="position" label="Current Position" required={true} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Show Next 10 Stations
            </Button>
            <Link href="/login" variant="body2">
              {"Signup and login for more options!"}
            </Link>
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
        <IFrame height="320px" id="gmaps" url={gMaps}></IFrame>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Next 10 Fuel Stations</Title>
          <Table className="station-list" size="small" >
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Name</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Street</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>Post Code</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>City</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>Last Update</TableCell>
                <TableCell>E10</TableCell>
                <TableCell>E5</TableCell>
                <TableCell>Diesel</TableCell>
                <TableCell>Route</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map(station => {
                return (
                  <TableRow key={station.id}>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{station.brand}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{station.street} {station.house_number}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>{station.post_code}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{station.place}</TableCell>
                    <TableCell align='center'>{station.distance}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'table-cell' } }}>{station.date.substr(station.date.length - 8)}</TableCell>
                    <TableCell>{(station.e10/1000).toFixed(2)}€</TableCell>
                    <TableCell>{(station.e5/1000).toFixed(2)}€</TableCell>
                    <TableCell>{(station.diesel/1000).toFixed(2)}€</TableCell>
                    <TableCell align='center'><Directions onClick={theClick(station.route.replace('zdestination', `${station.street}+${station.house_number}+${station.post_code}+${station.place}`))} /></TableCell>
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
