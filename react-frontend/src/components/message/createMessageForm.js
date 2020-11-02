import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import style from './message.css'
const axios = require('axios');
export default class CreateMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceEmail: "hello@buffalo.edu",
      password:"helloworld",
      destEmail: "hello@gmail.com",
      header: "Good day sir!",
      messageList: [],
      parentCounter: 0,
      formErrors: {
        sourceEmail: "",
        destEmail: "",
        header: "",
      }
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  listMessages() {
    axios.get('http://localhost:5000/listMessages', { headers: { "userID": this.state.sourceEmail } })
      .then(function (data) {
        this.state.messageList.push(data)
      })
  }

  //handles form button being clicked.
  createBody = (n) => {
    return {
      header: this.state.header,
      parentMessageID: this.state.parentCounter,
      userID: this.state.sourceEmail,
      recieverID: this.state.recieverID,
      content: this.state.content
    }

  }
  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }
    
  handleSubmit(event) {
    fetch('http://localhost:5000/createMessage', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(this.createBody)
    }).then(response => response.json())
    window.location.reload()
  }
  componentDidMount() {

  }

  render() {
    const classesList = makeStyles((theme) => ({
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
    const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    }));
    return (
      <div>
          <h1>Send a Message!</h1>
        <form onSubmit={this.onRegister} className={style.messageForm}>
          <input
            placeholder="Username"
            name="username"
            type="text"
            onChange={this.onInputChange}
            value={this.state.sourceEmail.value}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.onInputChange}
            value={this.state.sourceEmail.value}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.onInputChange}
            value={this.state.password.value}
            required
          />
          <button>Submit</button>
        </form>
        <hr />
        {this.state.apiCall && (
          <div onClick={this.handleSubmit}>
            (made api call)
          </div>
        )}
      </div>
    );
  }
}