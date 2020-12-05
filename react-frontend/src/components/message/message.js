import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import CreateMessage from './createMessageForm.js';
import ListMessage from './listMessage'
import DeleteMessage from './deleteMessage.js'
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
    axios.get('http://localhost:5000/listParentMessages', { headers: { "parentID": this.state.parentCounter } })
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
    if(this.state.sourceEmail.length > 0){
      create = <CreateMessage sourceEmail={this.state.sourceEmail}/>;
      list = <ListMessage sourceEmail={this.state.sourceEmail}/>
      del = <DeleteMessage sourceEmail={this.state.sourceEmail}/>
    }
    return (
      <React.Fragment>
      <div>
        <h2>Enter your Username below before proceeding</h2>
        <TextField type="email" name="sourceEmail" label="Enter email address" value={this.state.sourceEmail} onChange={this.handleChange} variant="outlined" color="primary"/>
      </div>
      <div>{create}</div>
      <div>{list}</div>
      <div>{del}</div>
      </React.Fragment>
    )
  }
}
