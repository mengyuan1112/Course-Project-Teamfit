import React from 'react';
import HomePage from './components/homepage/home.js'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Paper, Tabs } from '@material-ui/core';
import './App.css';
import ReactDOM, { render } from "react-dom";
import Login from './components/logReg/login.js';
import Profile from './components/profile/profile.js';
import Feed from './components/post/feed.js';


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
      showProfile: false,
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
      case "home":
        this.setState({showHome: !this.state.showHome});
        break;
      case "profile" :
        this.setState({showProfile: !this.state.showProfile});
        break;
      default:
        this.setState({showLogin: !this.state.showLogin}); 
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return(
      <HashRouter basename="/SnapScout">
        <div className="container">
          <Route exact path="/" render={() => <Login />} />
            <Switch>
              <Route path="/home" render={() => <HomePage />}/>
              <Route path="/feed" render={() => <Feed />}/>
              <Route path="/profile" render={() => <Profile />}/>
            </Switch>
        </div>
      </HashRouter>
    )};
}

ReactDOM.render(<App/>, document.getElementById('root'));



export default App;
