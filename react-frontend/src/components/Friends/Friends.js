// import React from 'react';
import '../post/feed'
import './Friends.css'
import axiosConfig from 'axios';
import Axios from 'axios';
import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";

const Person = ({ img, name, occupation, children }) => {
  const url = `https://randomuser.me/api/portraits/thumb/men/${img}.jpg`;
  return (
    <div className="person">
      <img src={url} alt="person img" />
      <div>
        <h4>{name}</h4>
        <h4>{occupation}</h4>
        {children}
      </div>
    </div>
  );
};
const PersonList = () => {
   
   
  return (
   
    <section className="person-list" >
        <h1 className="person-list">Suggested Friends:</h1>
      <Person img="34" name="john" >
      <button class="mini ui button"  >
  <i class="icon user"></i>
  Add Friend
</button>
         </Person>
      <Person img="22" name="bob" >
      
      <button class="mini ui button" >
  <i class="icon user"></i>
  Add Friend
</button>

      </Person>
      <Person img="56" name="david"  >
      <button class="mini ui button">
  <i class="icon user"></i>
  Add Friend
</button>
         </Person>
    </section>
  );
};

class friends extends React.Component{

  
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           friends: {},
           response: {},
           friendNum: '',
           message: '',           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }

  componentWillMount() {
   Axios('http://localhost:5000/friends/get_friends', {method: "GET"}).then(response => this.setState({friends: response.data}));
   console.log(this.state.friends)
  }
      
     
  handleChange(event) { 
   this.setState({friendNum: event.target.value}); 
   Axios('http://localhost:5000/friends/get_friends', {method: "GET"}).then(response => this.setState({friends: response.data}));
   console.log(this.state.message)
   console.log(this.state.friends)
  }
  handleSubmit(event) {
   event.preventDefault();

     axiosConfig.post('http://127.0.0.1:5000/friends/addfriend',{
      body : this.state.friendNum,
      headers:{"Content-Type":"application/json",},
      cache: "no-cache",
      })
      .then(response => {
          let res = response.data
          console.log(res)
          this.setState({message: res['state']})
          alert(this.state.message)
          console.log(this.state.message)
          console.log(this.state.friends)
      });
  
  }

    render() {
       const folks = this.state.friends
      return (
            <div >               
               <h2 className='title'>Friends:</h2>
               
               
               <PersonList />;
               
               
               
               {Object.keys(folks).map((key,id) => {
                  return <h2 key={id} className="friend">{this.state.friends[key]} | {key}</h2>
               })}
              
              <form onSubmit={this.handleSubmit}>
            <label style={{ fontWeight: 'bold' }}>
               Add a friend: 
               <input type="text" value={this.state.friendNum} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
            </form>  
            </div>      
         )
         
            
          
         
    };
    
     
}


// ReactDOM.render(<friends />, document.getElementById('root'));
export default friends;
