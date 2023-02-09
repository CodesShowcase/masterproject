import React from 'react'
import { Route, Navigate } from 'react-router-dom'
//import { isAuthenticated } from '../../services/auth'

const yes = true

export const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    //isAuthenticated() 
    (yes) ? (
      React.createElement(component, props)
    ) : (
      <Navigate to={{ pathname: '/login' }} />
    )
  return <Route {...rest} render={routeComponent} />
}