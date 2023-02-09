import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { REST_API } from '../../../utils/constants'
import { logout } from '../../../features/auth'
import { useAppDispatch } from '../../../hooks'

interface PushProps {
  title: string
}

export default function Logout(props: PushProps) {
  const [err, setErr] = useState('')
  const dispatch = useAppDispatch()
  const logoutUser = logout()
  const navigate = useNavigate()

  console.log(err)

  useEffect(() => {
    const logout = async () => {
      const path = '/'
      try {
        const response = await fetch(`${REST_API}/api/users/logout`, {
          method: 'POST',
          body: JSON.stringify({
          }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }
        const result = await response.json()
        dispatch(logoutUser)
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
    logout()
  },[dispatch, logoutUser, navigate])

  return (
    <Container component="main" maxWidth="xs" className="auth-form">
      <Typography variant="h2" className="auth-header">{props.title}</Typography>
      <Typography variant="h6" component="h2" >Logging out and redirecting to home...</Typography>
      <CssBaseline />
    </Container>
  );
}
