import React from 'react';
import logo from '../../logo.svg';
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class MainPage extends React.Component {

    render(){
        return(
            <div className="MainPage">
            <header className="MainPage-header">
              <img src={logo} className="MainPage-logo" alt="logo" />
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
              <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
              >
                Upload
      </Button>
              <Button
                variant="contained"
                color="default">
                Home
      </Button>
            </header>
          </div>   
        )
    }
}
export default MainPage;