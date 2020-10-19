import { List, ListItem, ListItemText, ListSubheader, TextField, Button, RaisedButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
const axios = require('axios');
export default class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceEmail: "jacobgol@buffalo.edu",
      destEmail: null,
      header: null,
      messageList: [] ,
      parentCounter: 0,
      formErrors: {
        sourceEmail: "",
        destEmail: "",
        header: "",
      }
    }
  }

  listMessages(){
    axios.get('http://localhost:5000/listMessages', {headers: {"userID":this.state.sourceEmail}})
    .then(function(data){
      this.state.messageList.push(data)
    })
  }

  listParents(){
    axios.get('http://localhost:5000/listParentMessages', {headers: {"parentID":this.state.sourceEmail}})
    .then(function(data){
      this.state.parentList.push(data)
    })
  }
//handles form button being clicked.
  handleSubmit(event){
    axios.post('/createMessage', {
//      header: this.state.header,
      parentMessageID: this.state.parentMessageID,
      userID: this.state.sourceEmail,
      recieverID: this.state.recieverID,
      content: this.state.content
    }).then(function(data){
      console.log('submitted ur message')
    })
  }

  updateUserId(event){
    this.setState({sourceEmail: event.target.value})
  }

  updateDestEmail(event){
    this.setState({destEmail: event.target.value})
  }

  updateParentID(event){
    this.setState({parentID: ++parentCounter})
  }

  updateHeader(event){
    this.setState({header: event.target.value})
  }

  updateContent(event){
    this.setState({content: event.target.value})
  }

  componentDidMount() {

  }

  render(){
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
          <TextField error id="standard-error" label="Error" defaultValue="your@gmail.com" onChange={this.updateUserId}/>  
          <TextField error id="standard-error" label="Error" defaultValue="recieverEmail@gmail.com" onChange={this.updateDestEmail} />
          <TextField errir id="standard-error" label="Error" defaultValue="Enter your message header" onChange={this.updateHeader}>      
          <TextField errir id="standard-error" label="Error" defaultValue="Enter your message" onChange={this.updateContent}>      
          <RaisedButton type="submit" label="login" className="button-submit" primary={true} onClick={this.handleSubmit}/>
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
              {[0,1,2,3,4].map((item) => (
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