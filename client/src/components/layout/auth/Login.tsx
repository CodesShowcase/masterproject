import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { REST_API } from '../../../utils/constants'
import { login } from '../../../features/auth'
import { useAppDispatch } from '../../../hooks'

interface PushProps {
  title: string
}

export default function Login(props: PushProps) {
  const [err, setErr] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Eyecandy
  console.log(err)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const path = '/home'
    try {
      const response = await fetch(`${REST_API}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: data.get('username'),
          password: data.get('password'),
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }
      const result = await response.json()
      dispatch(login(result))
      navigate(path)
      console.log(result)

    } catch (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = err.message
      }
      setErr(errorMessage)
    }

  }

  return (
    <Container component="main" maxWidth="xs" className="auth-form">
      <Typography variant="h2" className="auth-header">{props.title}</Typography>
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <Grid item xs>
          <Link href="/reset" variant="body2" display="flex" justifyContent="flex-end">
            Forgot password?
          </Link>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
        <Divider>OR</Divider>
        <Button
          className="auth-button"
          type="button"
          fullWidth
          variant="contained"
          href="/signup"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
