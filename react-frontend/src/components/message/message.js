import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import CreateMessage from './createMessageForm.js';
import ListMessage from './listMessage'
import DeleteMessage from './deleteMessage.js'
import Grid from '@material-ui/core/Grid';

const axios = require('axios');

export default class Messages extends React.Component {

  constructor(props) {
    super();
    this.state = {
      sourceEmail: "",
      password:"",
      destEmail: "",
      header: "",
      messageList: [],
      parentCounter: 0,
      formErrors: {
        sourceEmail: "",
        destEmail: "",
        header: "",
      }
    }
  }

  listParents() {
    axios.get('http://18.223.214.126:5000/listParentMessages', { headers: { "parentID": this.state.parentCounter } })
      .then(function (data) {
        this.state.parentList.push(data)
      })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  componentDidMount() {
    console.log(this.state.sourceEmail)
  }

  render() {
    let list;
    let del;
    let create;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.sourceEmail)){
      create = <CreateMessage sourceEmail={this.state.sourceEmail}/>;
      list = <ListMessage sourceEmail={this.state.sourceEmail}/>
      del = <DeleteMessage sourceEmail={this.state.sourceEmail}/>
    }
else{

    }
    return (
      <Grid container direction="column" justify="center" alignItems="center">
      <div>
        <h2>Enter your Username below before proceeding</h2>
        <TextField type="email" name="sourceEmail" label="Enter email address" value={this.state.sourceEmail} onChange={this.handleChange} variant="outlined" color="primary"/>
      </div>
      <div>{create}</div>
      <div>{list}</div>
      <div>{del}</div>
      </Grid>
    )
  }
}
