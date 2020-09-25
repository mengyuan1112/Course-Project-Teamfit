import React from 'react';
import ReactDOM from "react-dom";
import MainPage from './components/main/mainpage.js'
import Upload from './components/upload/upload.js';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Paper, Tabs } from '@material-ui/core';
import Login from './components/logReg/login.js';

/**
 * Root Component
 * -contains child component that swaps out to the other components.
 */
class App extends React.Component {
  state = {
    currentPage: 'compApp'
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return(
      <HashRouter basename="/SnapScout">
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <MainPage />}/>
          <Route path="/login" render={() => <Login />} />
          <Route path="/upload" render={() => <Upload />} />
        </Switch>
      </div>
    </HashRouter>
    )};
}

export default App;
