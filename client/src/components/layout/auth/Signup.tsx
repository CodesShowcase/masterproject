import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Adjust the token [remove password]
// Optimize the token temp and cookie

interface PushProps {
  title: string
}

const ValidateLoginSchema = z
    .object({
      firstName: z.string().trim().max(12).min(3),
      lastName: z.string().trim().max(20).min(3),
      username: z.string().trim().max(20).min(4),
      email: z.string().email().trim().max(20).min(1),
      password: z.string().regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), { message: 'Min. 8 characters / 1 special / 1 number' }),
      confirm: z.string().regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), { message: 'Min. 8 characters / 1 special / 1 number' })
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"]
    })

type LoginFormSchemaType = z.infer<typeof ValidateLoginSchema>

export default function Signup(props: PushProps) {

  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(ValidateLoginSchema),
  })

  // OK, this is quite stupid, but it does work...
  // You can actually autotrigger the validation
  trigger()

  // This is just cosmetic for linting...
  console.log(err)

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    const path = '/'
    try {
      const response = await fetch('http://localhost:3080/api/users', {
        method: 'POST',
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }
      const result = await response.json()
      navigate(path)
      console.log(result)

      // Optional routing depending on result
      // Outlet

      // Don't forget to sanitize
      // Yes!

    } catch (err) {
      let errorMessage = "Failed to do something exceptional"
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
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              {...register('firstName')}
              autoFocus
            />
          </Grid>
          <Grid container justifyContent="flex-start" xs={12} sx={{color: 'red',  display: { xs: 'flex', sm: 'none' } , mt: 0, px: 2, typography: 'body2' }}>
            {errors.firstName && (<p className="text-sm mt-1">{errors.firstName.message}</p>)}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              {...register('lastName')}
            />
          </Grid>
          <Grid container justifyContent="flex-start" sm={6} sx={{ color: 'red',  display: { xs: 'none', sm: 'flex' } , mt: 0, px: 2, typography: 'body2' }}>
            {errors.firstName && (<p className="text-sm mt-1">{errors.firstName.message}</p>)}
          </Grid>
          <Grid container justifyContent="flex-start" xs={12} sm={6} sx={{ color: 'red', mt: 0, px: 2, typography: 'body2' }}>
            {errors.lastName && (<p className="text-sm mt-1">{errors.lastName.message}</p>)}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="userName"
              label="Username"
              {...register('username')}
            />
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ color: 'red', mt: 0, px: 2, typography: 'body2' }}>
            {errors.username && (<p className="text-sm text-red-600 mt-1">{errors.username.message}</p>)}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email')}
            />
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ color: 'red', mt: 0, px: 2, typography: 'body2' }}>
            {errors.email && (<p className="text-sm mt-1">{errors.email.message}</p>)}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              {...register('password')}
              type="password"
            />
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ color: 'red', mt: 0, px: 2, typography: 'body2' }}>
            {errors.password && (<p className="text-sm mt-1">{errors.password.message}</p>)}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              {...register('confirm')}
              type="password"
            />
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ color: 'red', mt: 0, px: 2, typography: 'body2' }}>
            {errors.confirm && (<p className="text-sm mt-1">{errors.confirm.message}</p>)}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
