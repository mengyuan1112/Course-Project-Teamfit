import React, { Component } from 'react';
import Form from './form.js';
import './feed.css';
import './post.css';
import './form.css';

class Post extends Component {

    // likePost = async e =>{
        

    // }
    
    render() {
        const pattern = new RegExp('^(https?:\\/\\/)?')
        if(!pattern.test(this.props.value.content)){
            return (
                <img src={this.props.value.content} width="190" height="190" alt="postImage"/>
            )
        }else{
            return (
                <div className="post">
                <span className="content">{this.props.value.content}</span>
                {/* <button>Like</button>  */}
                </div>
            )
        }
    }
}



export default Post;


