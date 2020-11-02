import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import CreateMessage from './createMessageForm.js';
import ListMessage from './listMessage'
const axios = require('axios');

export default class Messages extends React.Component {

  constructor(props) {
    super();
    this.state = {
      sourceEmail: "jacobgol@buffalo.edu",
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
  handleChange = (e) => this.setState({ 
    sourceEmail: e.target.sourceEmail
  }) 
  //handles form button being clicked.
 
  componentDidMount() {
    console.log(this.state.sourceEmail)
  }

  render() {
    return (
      <div>
        <h2>Enter your Username below before proceeding</h2>
        <TextField id="standrd-basic" onChange={this.handleChange} label="UserName"/>
        <CreateMessage data={this.state.sourceEmail}/>
        <ListMessage data ={this.state.sourceEmail}/>
      </div>
    )
  }
}
