import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import ReactDOM, { render } from "react-dom";
// import './components/post/post.js';
import Feed from './components/post/feed.js';
// import Post from './components/post/post.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Feed/>
      </div>
    );
  }
=======
import ReactDOM from "react-dom";
import HomePage from './components/homepage/home.js'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Paper, Tabs } from '@material-ui/core';
import Login from './components/logReg/login.js';
import Profile from './components/profile/profile.js';


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
              <Route path="/profile" render={() => <Profile />}/>
            </Switch>
        </div>
      </HashRouter>
    )};
>>>>>>> 7ffd433e9835dc54a2a40de176dc0375f3466900
}

ReactDOM.render(<App/>, document.getElementById('root'));



export default App;
