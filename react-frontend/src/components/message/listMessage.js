import { ListItem, ListItemText, ListSubheader, List, TextField, Button } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react';

export default class ListMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      randomCounter:0,
      errorMessage: "",
      messageList: []
    }
    this.listMessages = this.listMessages.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
      .then((response) => {
        // console.log(response)Destination Username

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
      }).catch((error) => {
        this.setState({errorMessage: error.message})
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
        <input
            placeholder="Destination Username"
            name="destEmail"
            type="email"
            onChange={this.onInputChange}
            required
          />
        <div>{this.state.errorMessage}</div>
        <Button onClick={this.listMessages} variant="contained">List</Button>

        <div>
        <ul>{this.state.messageList}</ul>
        </div>
      </div>
    )
  }
} 