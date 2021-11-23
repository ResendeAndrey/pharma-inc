import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import styles from './navbar.module.scss'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <div className={styles.company}>
            <IconButton
              size="large"
              edge="start"
              color="#2d3c49"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className={styles.title}>
              Pharma INC
            </Typography>
          </div>
          <div className={styles.user}>
            <IconButton
              size="large"
              edge="auto"
              color="#2d3c49"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Person />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;