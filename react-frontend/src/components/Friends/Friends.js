import React from 'react';
import '../post/feed'
import './Friends.css'
import axiosConfig from 'axios';
import Axios from 'axios';

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
