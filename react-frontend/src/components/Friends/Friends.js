import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import '../post/feed'
import avatar from "../../avatar.jpg";
//import './Friends.css'
import Feed from '../post/feed';
import Masonry from 'react-masonry-css'
import Axios from 'axios';
import table from 'react-bootstrap/table';
import Button from 'react-bootstrap/Button';
class friends extends React.Component{

    componentDidMount() {
        Axios.get('http://localhost:5000/friends/friends_get').then(response=> { this.setState({userInfo: response.data});})
        console.log(this.state.userInfo)
    }

    componentWillUnmount(){
        
    }
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           students: [
              {   Spotters: 'Hank',Suggested: 'ALI' },
              {   Spotters: 'Michel', Suggested: 'JOE' },
              {   Spotters: 'Syed', Suggested: 'JACKIE' },
              {   Spotters: 'Asad', Suggested: 'WILLIAM' }
           ]
        }
     }
     renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

     renderTableData() {
        return this.state.students.map((student, index) => {
           const { Spotters , Suggested } = student //destructuring
           return (
              <tr >
                
                 <td>{Spotters}</td>
                 {/* <td>{"     "}</td> */}
                
                 {/* <td>{"     "}</td> */}
           <td>{" "}{Suggested}</td>
              </tr>
           )
        })
     }
  

    render() {
        return (
            <div >
               
                {/* <table cellpadding="10" cellspacing="10"></table> */}
               <h1 id='title'>Friends Page</h1>
               {/* <td>Spotters</td>
                 
        <td>{" "}Suggested</td> */}
               <table cellpadding="10" cellspacing="8" id='students' >
                  <tbody>
                  
                     <tr cellpadding="10" cellspacing="10">{this.renderTableHeader()}</tr>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
            
         )
    };
}


// ReactDOM.render(<friends />, document.getElementById('root'));
export default friends;
