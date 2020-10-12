import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

export default function PinnedSubheaderList() {
    const classes = useStyles();
  
    return (
      <List className={classes.root} subheader={<li />}>
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    );
}