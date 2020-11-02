import { ListItem, ListItemText, ListSubheader, List, TextField } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react';

export default class ListMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceEmail: "",
      messageList: [
        [
        599634752170000385,
        "jacobgol@buffalo.edu",
        "jgoldverg@gmail.com",
        "Hello this is alll part of my message and body no file attatchments just pure text",
        "hello",
        1
      ],
      [
        599634839593418753,
        "jacobgol@buffalo.edu",
        "jgoldverg@gmail.com",
        "Hello this is alll part of my message and body no file attatchments just pure text",
        "hello",
        1
      ],
      [
        599648301714112513,
        "jacobgol@buffalo.edu",
        "jgoldverg@gmail.com",
        "Hello this is alll part of my message and body no file attatchments just pure text",
        "hello",
        1
      ]
      ]
    }
  }

  componentDidMount() {
    console.log("In List Message component" + this.props.sourceEmail)
  }

  listMessages = (event) => {
    axios.get('http://localhost:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
      .then(function (data) {
        console.log(this.props.sourceEmail)
        this.setState({ messageList: data })
        console.log(data);
      })

  }
  manipulateData(){

  }

  handleChange = (e) => this.setState({
    sourceEmail: e.target.sourceEmail
  })
  //handles form button being clicked.

  render() {
    this.listMessages.bind(this);
    return (
      <div className="message">
        <h2>Enter your Username below before proceeding</h2>
        <TextField primary id="standard-basic" label="Your Email" onChange={this.handleChange} defaultValue={this.state.sourceEmail} />
        <List subheader={<li />}>
          <ListSubheader>{`Messages`}</ListSubheader>
          {this.state.messageList.map((message) => (
            <li key={`Reciever-${message[2]}`}>
              <ListItem key={`item-${message[2]}-${message[2]}`}>
                <ListItemText primary={`Recepient ${message[2]}`} />
              </ListItem>
            </li>
          ))}
        </List>
      </div>
    )
  }
} 