import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import style from './message.css'
const axios = require('axios');
export default class CreateMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destEmail: "destination@gmail.com",
      header: "Good day sir!",
      messageList: [],
      parentCounter: 0,
      content:"",
      errorList:""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createBody = this.createBody.bind(this);
  }

  listMessages() {
    axios.get('http://localhost:5000/listMessages', { headers: { "userID": this.props.sourceEmail } })
      .then(function (data) {
        this.state.messageList.push(data)
      })
  }

  //handles form button being clicked.
  createBody = (n) => {
    return 

  }
  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }
    
  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/createMessage', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        header: this.state.header,
        parentMessageID: "2",
        userID: this.props.sourceEmail,
        recieverID: "hello",
        data: "hello"
      })
    }).then(function(response){
      if(response.statusCode === 200){
        this.state.append("was not able to recieve a 200 for creating a message from flask")        
      }
    }).catch((error) => {
      this.setState({errorList: error.message})
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
        <h1>Send a Message!</h1>
        <div>{this.state.errorList}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Destination Username"
            name="destEmail"
            type="email"
            onChange={this.onInputChange}
            required
          />
          <input
            placeholder="Content"
            name="content"
            type="text"
            onChange={this.onInputChange}
            required
          />
          <button>Submit Message</button>
        </form>
      </div>
    );
  }
}