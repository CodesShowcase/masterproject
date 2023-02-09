import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Title from '../common/Title'
import { REST_API } from '../../../utils/constants'


export default function User() {

  const { userid } = useParams()
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [car, setCar] = useState('')
  const [fuel, setFuel] = useState('')
  const [alarm, setAlarm] = useState('')
  const [tanksize, setTankSize] = useState('')
  const [mileage, setMileage] = useState('')
  const [yearlydriving, setYearlyDriving] = useState('')
  const [location, setLocation] = useState('')
  const [userlevel, setUserlevel] = useState('')
  const [pending, setPending] = useState<boolean>()
  const [suspended, setSuspended] = useState<boolean>()
  const [err, setErr] = useState('')

  console.log(err) // This is just for linting!

  useEffect(() => {
    const getMyUser = async () => {
        const response = await fetch(`${REST_API}/api/users/${userid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        const result = await response.json()
        setFirstName((result.firstname != null) ? result.firstname : "")
        setLastName((result.lastname != null) ? result.lastname : "")
        setUsername((result.username != null) ? result.username : "")
        setEmail((result.email != null) ? result.email : "")
        setPassword("")
        setAvatar((result.avatar != null) ? result.avatar : "")
        setCar((result.car != null) ? result.car : "")
        setFuel((result.gas != null) ? result.gas : "")
        setAlarm((result.alarm != null) ? result.alarm : "")
        setTankSize((result.tanksize != null) ? result.tanksize : "")
        setMileage((result.mileage != null) ? result.mileage : "")
        setYearlyDriving((result.yearlydriving != null) ? result.yearlydriving : "")
        setLocation((result.location != null) ? result.location : "")
    }
    const getMySecurity = async () => {
        const response = await fetch(`${REST_API}/api/secure/${userid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        const result = await response.json()
        setUserlevel(result.userlevel)
        setPending(result.pending)
        setSuspended(result.suspended)
    }
    getMyUser()
    getMySecurity()
  }, [userid])


  const handleSubmit = async () => {
    try {
      console.log(password)
      const userUpdate = await fetch(`${REST_API}/api/users`, {
        method: 'PUT',
        body: JSON.stringify({
          id: userid,
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          avatar: avatar,
          car: car,
          gas: fuel,
          alarm: alarm,
          tanksize: tanksize,
          mileage: mileage,
          yearlydriving: yearlydriving,
          location: location
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const res_user = await userUpdate.json()
      if (userlevel == 'admin') {
        const secuUpdate = await fetch(`${REST_API}/api/secure`, {
          method: 'PUT',
          body: JSON.stringify({
            userid: userid,
            pending: pending,
            suspended: suspended
          }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        const res_secu = await secuUpdate.json()
        console.log(res_secu)
      }
      console.log(res_user)
    } catch (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setErr(errorMessage);
    }
  }

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
        <Grid container spacing={2}>

          <Grid item xs={12} md={4} lg={4} sx={{ display: { xs: 'block', md: 'none' }, mt: 0 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 260 }}>
            <Title>Welcome, {firstname} {lastname}!</Title>
            <picture><img className="identifier-avatar" src={avatar} /></picture>
            <Typography variant="h2" className="identifier">&raquo; {username} &laquo;</Typography>
            <Typography variant="h2" className="identifier">&raquo; {email} &laquo;</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <Paper className="personal-data-paper" sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 470 }}>
              <Title>Your Personal Data</Title>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField id="firstname" label="First Name" autoComplete="firstname" value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} margin="normal" fullWidth required={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="lastname" label="Last Name" autoComplete="lastname" value={lastname} onChange={(e)=>{setLastName(e.target.value)}} margin="normal" fullWidth required={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="password" label="Password [min. length 8]" type="password" onChange={(e)=>{setPassword(e.target.value)}} margin="normal" fullWidth required={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="avatar" label="Avatar [URL - 400px * 400px]" autoComplete="avatar"  value={avatar} onChange={(e)=>{setAvatar(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="car" label="Car" autoComplete="car" value={car} onChange={(e)=>{setCar(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel id="fuel-selector-label">Fuel</FormLabel>
                  <RadioGroup row aria-labelledby="fuel-selector-label" defaultValue="Empty" value={fuel} onChange={(e)=>{setFuel(e.target.value)}} name="fuel-selector">
                    <FormControlLabel value="e5" control={<Radio />} label="e5" />
                    <FormControlLabel value="e10" control={<Radio />} label="e10" />
                    <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
                    <FormControlLabel value="" control={<Radio />} label="None" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="price-alarm" label="Price Alarm [€/l]" autoComplete="alarm" value={alarm} onChange={(e)=>{setAlarm(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="tanksize" label="Tanksize [l]" autoComplete="tanksize" value={tanksize} onChange={(e)=>{setTankSize(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="mileage" label="Mileage [l/100km]" autoComplete="mileage" value={mileage} onChange={(e)=>{setMileage(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="yearlydriving" label="Yearly Driving [1.000 kms]" autoComplete="yearlydriving" value={yearlydriving} onChange={(e)=>{setYearlyDriving(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="location" label="Preferred Location" autoComplete="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} margin="normal" fullWidth required={false} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={4} sx={{ mt: 0 }}>
            <Paper sx={{ p: 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', height: 260 }}>
            <Title>Welcome, {firstname} {lastname}!</Title>
            <picture><img className="identifier-avatar" src={avatar} /></picture>
            <Typography variant="h2" className="identifier">&raquo; {userlevel} &laquo;</Typography>
            <Typography variant="h2" className="identifier">&raquo; {email} &laquo;</Typography>
            </Paper>
            <Paper sx={{ mt:2, p: 2, display: 'flex', flexDirection: 'column', height: 194 }}>
              <Typography variant="h2" className="identifier">Created: 11-12-2022</Typography>
              <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel control={<Switch checked={pending} onChange={(e)=>{setPending(e.target.checked)}} disabled={(userlevel == 'admin') ? false : true} />} label="Pending" />
                <FormControlLabel control={<Switch checked={suspended} onChange={(e)=>{setSuspended(e.target.checked)}} disabled={(userlevel == 'admin') ? false : true} />} label="Suspended" />
              </FormGroup>
              <Button id="user-submit" type="submit" onClick={() => handleSubmit()} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
