import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import '../post/feed'
//import './Friends.css'
import Feed from '../post/feed';

class friends extends React.Component{

    componentDidMount(){

    }

    componentWillUnmount(){
        
    }

    render() {
        return (
        <div>
            <div className="rows">
                <div className="row">
                    <h1>Friends:</h1>
                    <img className="image" size="tiny" alt="profilepic" src="https://i.stack.imgur.com/l60Hf.png"></img>
                    <img className="image" alt="profilepic" src="https://i.stack.imgur.com/l60Hf.png"></img>
                    <img className="image" alt="profilepic" src="https://i.stack.imgur.com/l60Hf.png"></img>
                </div> 
            </div>
        </div>
        )
    };
}



export default friends;
