import React from 'react';
import ReactDOM from "react-dom";
import MainPage from './components/main/mainpage.js'
import Upload from './components/upload/upload.js';
import NavBar from './components/navBar/navBar';

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Paper, Tabs } from '@material-ui/core';
import Login from './components/logReg/login.js';

/**
 * Root Component
 * -contains child component that swaps out to the other components.
 */
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "root",
      showNavBar: true,
      showUpload: false,
      showLogin: false,
      showHome: false
    }
  }
  state = {
    currentPage: 'compApp'
  }

  hideComponent(name){
    console.log(name);
    switch (name) {
      case "login":
        this.setState({showLogin: !this.state.showLogin});
        break;
      case "upload" :
        this.setState({showUpload: !this.state.showUpload});
        break;
      default:
        this.setState({showHome: !this.state.showHome}); 
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return(
      <HashRouter basename="/SnapScout">
      <div className="container">
        <Route exact path="" render={() => <NavBar />}/>
        <Switch>
          <Route exact path="/home" render={() => <MainPage />}/>
          <Route path="/login" render={() => <Login />} />
          <Route path="/upload" render={() => <Upload />} />
        </Switch>
      </div>
    </HashRouter>
    )};
}

export default App;
