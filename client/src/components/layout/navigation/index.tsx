import * as React from 'react'
import { Link } from 'react-router-dom'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
//import LoginIcon from '@mui/icons-material/Login'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { getCredentials, getAuthenticated } from '../../../features/auth'
import { useAppSelector } from '../../../hooks'


function Navigation() {
  const [anchorUserMenu, setAnchorUserMenu] = React.useState<null | HTMLElement>(null)
  const authCredentials = useAppSelector(getCredentials)
  const isAuthenticated = useAppSelector(getAuthenticated)

  const settings = { guest: [ { name: 'home', url: '/' }, { name: 'login', url: '/login' } ],
  user: [ { name: 'home', url: '/' }, { name: 'settings', url: `/user/${authCredentials.id}` }, {name: 'logout', url: '/logout'} ],
  admin: [ { name: 'home', url: '/' }, { name: 'dashboard', url: '/dashboard' }, {name: 'statistics', url: '/statistics'}, { name: 'settings', url: `/user/${authCredentials.id}` }, {name: 'logout', url: '/logout'} ] };

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget)
  }

  const closeUserMenu = () => {
    setAnchorUserMenu(null)
  }

  return (
    <header>
    <MuiAppBar position="static">
      <Toolbar sx={{ pr: '24px' }}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          <picture><img className="logo-claim" src="/assets/images/logo-claim.png" /></picture>
          <Link to="/"><picture><img className="logo" src="/assets/images/logo.png" /></picture></Link>
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={openUserMenu} color="inherit" className="account-icon">
            <AccountBoxIcon />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="user-links"
            anchorEl={anchorUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorUserMenu)}
            onClose={closeUserMenu}
          >
         { !isAuthenticated && settings.guest.map((setting) => (
            <MenuItem key={setting.name} onClick={closeUserMenu}>
              <Link to={setting.url}><Typography textAlign="center">{setting.name}</Typography></Link>
            </MenuItem>
          ))}
          { authCredentials.userlevel == 'user' && settings.user.map((setting) => (
            <MenuItem key={setting.name} onClick={closeUserMenu}>
              <Link to={setting.url}><Typography textAlign="center">{setting.name}</Typography></Link>
            </MenuItem>
          ))}
          { authCredentials.userlevel == 'admin' && settings.admin.map((setting) => (
            <MenuItem key={setting.name} onClick={closeUserMenu}>
              <Link to={setting.url}><Typography textAlign="center">{setting.name}</Typography></Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      </Toolbar>
    </MuiAppBar>
    </header>
  )
}

export default Navigation
