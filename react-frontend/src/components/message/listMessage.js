import { ListItem, ListItemText, ListSubheader, List, TextField, Button } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react';

export default class ListMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      randomCounter:0,
      messageList: []
    }
    this.listMessages = this.listMessages.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
      .then((response) => {
        console.log(response)
        this.setState({messageList: response.json})
      })
      console.log("In List Message component" + this.props.sourceEmail)
  }

  listMessages = () => {
    var self = this
    axios.get('http://localhost:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
      .then((response) => {
        console.log(response)
        self.setState({messageList: response.data})
      })
  }

  handleChange = (e) => this.setState({
    sourceEmail: e.target.sourceEmail
  })

  render() {
    this.listMessages.bind(this);
    return (
      <div className="message">
        <h2>Which of your messages do you want to list</h2>
        <TextField>Enter the recipient email</TextField>
        <p></p>
        <Button onClick={this.handleChange} variant="contained">Update username</Button>
        <Button onClick={this.listMessages} variant="contained">Refresh</Button>

        <div>
        <ul>{this.state.messageList}</ul>
        </div>
      </div>
    )
  }
} 