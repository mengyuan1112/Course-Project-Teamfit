import { ListItem, ListItemText, ListSubheader, List, TextField, Button } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
export default class ListMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: "",
      messageList: [],
      messageObjectList: []
    }
    this.listMessages = this.listMessages.bind(this);
  }

  style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
  
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
        this.state.messageList.map((element, idx) => {
          this.state.messageObjectList.push({element})
        })
      }).catch((error) => {
        this.setState({errorMessage: error.message})
      })
  }
  
  handleChange = (e) => this.setState({
    sourceEmail: e.target.sourceEmail
  })

  render() {
    this.listMessages.bind(this);
    var renderedOutput = this.state.messageObjectList.map(item => <div> {item} </div>)
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