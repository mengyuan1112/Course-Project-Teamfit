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
      {["jacobgol@buffalo.edu", "helloworld@buffalo.edu", "byeworld@buffalo.edu"].map((sectionId) => (
        <li key={`messages-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>
              {`Message: ${sectionId}`}
            </ListSubheader>
            {[0,1,2,3,4].map((item) => (
              <ListItem button key={`Username-${sectionId}-${item}`}>
                <ListItemText primary={`Message ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}