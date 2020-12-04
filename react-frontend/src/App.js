import React from 'react';
import ReactDOM from "react-dom";

import Home from './components/homepage/home.js'
import NavBar from './components/navBar/navBar';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Paper, Tabs } from '@material-ui/core';
import './App.css';
import Login from './components/logReg/login.js';
import Register from './components/logReg/register.js'
import Profile from './components/profile/profile.js';
import Friends from './components/Friends/Friends.js';
import Feed from './components/post/feed.js';
import Message from './components/message/message.js';
import Nutrition from "./components/profileNutrition/nutrition";
import Fitness from "./components/profileFitness/fitness";
import Compare from "./components/profileCompare/compare"


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
      showHome: false,
      showRegister: false,
      showfriends:false
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
      case "Friends":
          this.setState({showfriends: !this.state.showfriends});
          break;
      case "profile" :
        this.setState({showProfile: !this.state.showProfile});
        break;
        case "register" :
        this.setState({showRegister: !this.state.showRegister});
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
      <BrowserRouter basename="/SnapScout">
      <div className="container">
        <Route exact path="" render={() => <NavBar />}/>
        <Switch>
          <Route exact path="/home" render={() => <Home />}/>
          <Route path="/friends" render={() => <Friends />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/profile/nutrition" render={() => <Nutrition />}/>
          <Route path="/profile/fitness" render={() => <Fitness />}/>
          <Route path="/profile/compare" render={() => <Compare />}/>
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/feed" render={() => <Feed />} />
          <Route path="/message" render={() => <Message />} />
          <Route path="/friends" render={() => <Message />} />
        </Switch>
      </div>
    </BrowserRouter>
    )};
}

ReactDOM.render(<App/>, document.getElementById('root'));



export default App;
