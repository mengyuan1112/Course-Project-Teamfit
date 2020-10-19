import { List, ListItem, ListItemText, ListSubheader, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
const axios = require('axios');
export default class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceEmail: "jacobgol@buffalo.edu",
      destEmail: "",
      header: "",
      messageList: [],
      parentCounter: 0,
      formErrors: {
        sourceEmail: "",
        destEmail: "",
        header: "",
      }
    }
  }

  listMessages() {
    axios.get('http://localhost:5000/listMessages', { headers: { "userID": this.state.sourceEmail } })
      .then(function (data) {
        this.state.messageList.push(data)
      })
  }

  listParents() {
    axios.get('http://localhost:5000/listParentMessages', { headers: { "parentID": this.state.sourceEmail } })
      .then(function (data) {
        this.state.parentList.push(data)
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

  updateSourceEmail(event) {
    this.setState({ sourceEmail: event.target.value })
  }

  updateDestEmail(event) {
    this.setState({ destEmail: event.target.value })
  }

  updateParentID(event) {
    this.setState({ parentCounter: ++this.state.parentCounter })
  }

  updateHeader(event) {
    this.setState({ header: event.target.value })
  }

  updateContent(event) {
    this.setState({ content: event.target.value })
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField error id="standard-error" label="Error" defaultValue="your@gmail.com" onChange={this.updateSourceEmail} />
            <TextField error id="standard-error" label="Error" defaultValue="recieverEmail@gmail.com" onChange={this.updateDestEmail} />
            <TextField defaultValue="Enter message header here" onChange={this.updateHeader} />
            <TextField defaultValue="Enter message here" onChange={this.updateContent} />
            <Button label="Send" variant="contained" className="button-submit" color="primary">Send</Button>
          </form>
        </div>
        <div>
          <List className={classesList.root} subheader={<li />}>
            {["jacobgol@buffalo.edu", "helloworld@buffalo.edu", "byeworld@buffalo.edu"].map((sectionId) => (
              <li key={`messages-${sectionId}`} className={classesList.listSection}>
                <ul className={classesList.ul}>
                  <ListSubheader>
                    {`Message: ${sectionId}`}
                  </ListSubheader>
                  {[0, 1, 2, 3, 4].map((item) => (
                    <ListItem button key={`Username-${sectionId}-${item}`}>
                      <ListItemText primary={`Message ${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </div>
      </div>
    );
  }
}