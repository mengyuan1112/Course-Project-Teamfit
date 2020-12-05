import { TextField, Button, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import style from './message.css'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import Send from '@material-ui/icons/Send';
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
      errorList:"",
      diaglogSwitch: false
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setOpen(binary){
    this.setState({
      diaglogSwitch: binary
    })
  }

  handleOpen = () => {
    this.setOpen({diaglogSwitch: true});
  }

  handleClose = () => {
    this.setState({diaglogSwitch: false});
  }

  listMessages() {
    axios.get('http://localhost:5000/listMessages', { headers: { "userID": this.props.sourceEmail } })
      .then(function (data) {
        this.state.messageList.push(data)
      });
  }
  
  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }
  
  handleSubmit = e => {
    this.setState({parentMessageID: this.state.parentCounter++})
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
    this.handleClose();
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Send a Message
        </Button>
        <Dialog open={this.state.diaglogSwitch} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="createMessageTitle">Send a message!</DialogTitle>
          <TextField
            autoFocus
            disabled
            margin="dense"
            name="sourceEmail"
            defaultValue={this.props.sourceEmail}
            id="senderEmail"
            label="Your Email Address"
            type="email"
            onChange={this.onInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="destEmail"
            id="recieverEmail"
            label="Destination Email Address"
            type="email"
            onChange={this.onInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="content"
            id="message-data"
            label="Your Message"
            type="text"
            fullWidth
            onChange={this.onInputChange}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" endIcon={<SendIcon/>}> 
              Send
            </Button>
          </DialogActions>

        </Dialog>
        <div>{this.state.errorList}</div>
      </div>
    );
  }
}