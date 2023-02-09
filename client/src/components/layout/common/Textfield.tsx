import * as React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldProps {
  id : string
  label : string
  required: boolean
}

export function Textfield(props: TextFieldProps) {
  return (
    <TextField
      margin="normal"
      required={props.required}
      fullWidth
      id={props.id}
      label={props.label}
      name={props.id}
      autoComplete={props.id}
      autoFocus
    />
  )
}

export function Passwordfield(props: TextFieldProps) {
  return (
    <TextField
      margin="normal"
      required={props.required}
      fullWidth
      id={props.id}
      label={props.label}
      name={props.id}
      autoComplete={props.id}
      type="password"
      autoFocus
    />
  )
}
