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
    const renderList = this.state.sourceEmail;
    let list;
    let create = <CreateMessage sourceEmail={this.state.sourceEmail}/>;
    if(this.state.sourceEmail.length > 0){
      list = <ListMessage sourceEmail={this.state.sourceEmail}/>
    }else{
      create = <CreateMessage sourceEmail={this.state.sourceEmail}/>
    }
    return (
      <React.Fragment>
      <div>
        <h2>Enter your Username below before proceeding</h2>
        <form>
          <input type="text" name="sourceEmail" value={this.state.sourceEmail} onChange={this.handleChange}/>
        </form>
      </div>
      <div>{create}</div>
    <div>{list}</div>
      <h2>Your username is: {this.state.sourceEmail}</h2>
      </React.Fragment>
    )
  }
}
