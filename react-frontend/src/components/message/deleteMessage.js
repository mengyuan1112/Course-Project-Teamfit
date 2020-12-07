import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import style from './message.css'
const axios = require('axios');
const host = "http://localhost:5000/"
export default class DeleteMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageID: 0,
      errorMessage: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }
    
  handleSubmit = e => {
    e.preventDefault();
    fetch(host+'deleteMessage', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageID: this.state.messageID.value
      })
    }).catch((error) => {
      this.setState({errorMessage: "Unable to connect to the Internet EW! UwU "})
    })
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
    <div>{this.state.errorMessage}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="MessageID"
            name="messageID"
            type="number"
            min="0"
            onChange={this.onInputChange}
            required
          />
          <button>Delete</button>
        </form>
      </div>
    );
  }
}