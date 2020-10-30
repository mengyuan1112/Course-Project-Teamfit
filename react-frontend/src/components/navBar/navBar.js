import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="end" className={classes.menuButton} aria-label="menu" onClick={ event => window.location.href = "/home" }>
            Home
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} aria-label="menu" onClick={ event => window.location.href = "/profile" }>
            Profile
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} aria-label="menu" onClick={ event => window.location.href = "/friends" }>
            Friends
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} aria-label="menu" onClick={ event => window.location.href = "/message" }>
            Message
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} aria-label="menu" onClick={ event => window.location.href = "/login" }>
            Login            
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}