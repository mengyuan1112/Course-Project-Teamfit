import { TextField, Button, Dialog } from '@material-ui/core';
import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';
const axios = require('axios');
export default class CreateMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destEmail: "example@gmail.com",
      header: "Headers should not be set by the user b/c I said so hahaha :)",
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

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });
  }
  
  handleSubmit = e => {
    this.setState({parentMessageID: this.state.parentCounter+=1})
    e.preventDefault();
    fetch('http://18.223.214.126:5000/createMessage', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        header: this.state.header,
        parentMessageID: this.state.parentCounter,
        userID: this.props.sourceEmail,
        recieverID: this.state.destEmail,
        data: this.state.content
      })
    }).then(function(response){
      if(response.statusCode === 200){
        console.log("made request to the backend flask app")
      }
    }).catch((error) => {
      this.setState({errorList: error.message})
    })
    this.handleClose();
  }

  render() {
    let alert;
    if(this.state.errorList.length > 1){
      alert = <Alert severity="error">{this.state.errorList}</Alert>
    }
    return (
      <div>
        <div>{alert}</div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Send a Message
        </Button>
        <Dialog open={this.state.diaglogSwitch} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="createMessageTitle">Send a message!</DialogTitle>
          <TextField autoFocus disabled margin="dense" name="sourceEmail" defaultValue={this.props.sourceEmail} id="senderEmail" label="Your Email Address" type="email" onChange={this.onInputChange} fullWidth/>
          <TextField autoFocus margin="dense" defaultValue={this.state.destEmail} name="destEmail" id="destEmail" label="Destination Email Address" type="email" onChange={this.onInputChange} fullWidth/>
          <TextField autoFocus margin="dense" name="content" id="content" label="Your Message" fullWidth onChange={this.onInputChange}/>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary"> Cancel </Button>
            <Button onClick={this.handleSubmit} color="primary" endIcon={<SendIcon/>}> Send</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}