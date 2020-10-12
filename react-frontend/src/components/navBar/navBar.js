import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';


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
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/home" }>
            Home
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/upload" }>
            Upload
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/feed" }>
            Feed            
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/login" }>
            Login            
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/register" }>
            Register
          </IconButton>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ event => window.location.href = "/message" }>
            Message
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}