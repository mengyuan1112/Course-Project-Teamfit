import { ListItem, ListItemText, ListSubheader, List, TextField, Button } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Card from "react-bootstrap/Card";


export default class ListMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: "",
      messageList: ["empty", "list", "of messages"],
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
  
  // componentDidMount() {
  //   axios.get('http://localhost:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
  //     .then((response) => {
  //       // console.log(response)Destination Username
  //       this.setState({messageList: response.json})
  //     })
  //     console.log("In List Message component" + this.props.sourceEmail)
  // }

  listMessages = () => {
    var self = this
    axios.get('http://18.223.214.126:5000/listMessages', { headers: { "messageID": this.props.sourceEmail } })
      .then((response) => {
        console.log(response)
        this.setState({messageList: response.data})
        console.log(this.state.messageList)
      }).catch((error) => {
        this.setState({errorMessage: error.message})
      })

  }
  
  handleChange = (e) => this.setState({
    sourceEmail: e.target.sourceEmail
  })

  handleTogge = () => {

  }

  render() {
    let alert;
    if(this.state.errorMessage.length > 1){
      alert = <Alert severity="error">{this.state.errorMessage}</Alert>
    }
    return (
      <div className="messageList">
          <div>{alert}</div>
          <Button onClick={this.listMessages} variant="contained">List</Button>
        {/*<div>{this.state.messageList.map((elem, idx) => {*/}
        {/*  <b>{elem}</b>*/}
        {/*})}*/}
        {/*</div>*/}

        {/*<div>*/}
        {/*  {this.state.messageList}*/}
        {/*</div>*/}
        <body>
        {this.state.messageList.map(response=>{
          return <body>{response}</body>;
        })}
        </body>
      </div>
    )
  }
} 