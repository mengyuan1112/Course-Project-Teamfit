import React from 'react';
import ReactDOM from "react-dom";
import MainPage from './components/main/mainpage.js';
import Login from './components/logReg/login.js';
import Register from './components/logReg/register.js';
import Upload from './components/upload/upload.js';

import {
  BrowserRouter as Router,
  Switch,
  Tab, Tabs,
  Route, BrowserRouter
} from "react-router-dom";
import { Paper, Tabs } from '@material-ui/core';

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
      <BrowserRouter>
        <div>
          <Paper>
            <Tabs
              value={this.state.currentPage}
              onChange={this.handleChange}
              indicatorColor={"secondary"}
              centered
              style={navStyle}
            >
              <Tab label="Home" to="/" component={Link}/>
              <Tab label="Upload" to="/upload" component={Link}/>
              <Tab label="Login" to="/login" component={Link}/>
              <Tab label="Register" to="/register" component={Link}/>
            </Tabs>
          </Paper>
          <Switch>
            <Route path="/" render={(props) => <MainPage {... props} />}/>
            <Route path="/upload" render={(props) => <Upload {... props} />}/>
            <Route path="/login" render={(props) => <Login {... props} />}/>
            <Route path="/register" render={(props) => <Register {... props} />}/>
          </Switch>
        </div>
      </BrowserRouter>

)};
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode >,
  document.getElementById('root')
);

serviceWorker.unregister();


export default App;
