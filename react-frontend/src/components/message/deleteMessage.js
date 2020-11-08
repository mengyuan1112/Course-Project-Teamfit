import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import style from './message.css'
const axios = require('axios');
export default class DeleteMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageID:"",
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    var payload = {
        messageID: this.state.messageID
    }
    axios.delete('http://localhost:5000/listMessages',{data:payload} )
      .then(function (data) {
        this.state.messageList.push(data)
      })
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }
    
  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/deleteMessage', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        messageID: this.state.messageID
      }
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
          <h2>Delete the message!</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="MessageID"
            name="content"
            type="text"
            onChange={this.onInputChange}
            required
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}