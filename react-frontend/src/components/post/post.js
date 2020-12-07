import React, { Component } from 'react';
import Form from './form.js';
import './post.css';


class Post extends Component {

    // likePost = async e =>{
        

    // }
    
    render(){
        return (
            <>
            <div className="post">
                {console.log(this.props.value)}
            <span className="content">{this.props.value}</span>
            </div>
            </>
        )
    }
}



export default Post;


