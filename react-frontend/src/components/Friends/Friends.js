import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import '../post/feed'
import avatar from "../../avatar.jpg";
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
                    <img src={avatar} width="180" height="180" alt="Login Image" />
                    <img src={avatar} width="180" height="180" alt="Login Image" />
                </div> 
            </div>
        </div>
        )
    };
}



export default friends;
